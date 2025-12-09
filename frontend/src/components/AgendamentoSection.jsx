import React, { useState, useEffect } from 'react';
import { sessaoAPI, clienteAPI } from '../lib/api';

// Layout component usando as utilities definidas
const Layout = ({ children, className = '' }) => (
    <div className={`container ${className}`}>
        {children}
    </div>
);

export const AgendamentoSection = () => {
    const [horariosAgendados, setHorariosAgendados] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        telefone: '',
        data: '',
        horario: '',
        cpf: '',
        descricao: ''
    });
    const [editId, setEditId] = useState(null);
    const [originalClienteId, setOriginalClienteId] = useState(null);

    const camposForm = [
        { label: "Nome Completo", type: "text", placeholder: "João Silva", id: "nome" },
        { label: "Email", type: "email", placeholder: "email@exemplo.com", id: "email" },
        { label: "Telefone", type: "tel", placeholder: "(61) 99999-9999", id: "telefone" },
        { label: "Data da Consulta", type: "date", id: "data" },
        { label: "Horário da Consulta", type: "time", id: "horario" },
        { label: "CPF", type: "text", placeholder: "000.000.000-00", id: "cpf" }
    ];

    // Buscar agendamentos ao carregar
    useEffect(() => {
        carregarAgendamentos();
    }, []);

    const carregarAgendamentos = async () => {
        try {
            setLoading(true);
            const response = await sessaoAPI.getAll();
            if (response.data) {
                setHorariosAgendados(response.data);
            }
        } catch (err) {
            console.error('Erro ao carregar agendamentos:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handleEdit = async (agendamento) => {
        setEditId(agendamento.id_sessao_PK);
        let cliente = null;
        if (agendamento.id_cliente_FK) {
            try {
                const response = await clienteAPI.getById(agendamento.id_cliente_FK);
                cliente = response.data || {};
            } catch {
                cliente = {};
            }
        }
        // Store original cliente FK to reuse on update
        setOriginalClienteId(agendamento.id_cliente_FK || null);
        const formatToYYYYMMDD = (dateInput) => {
            if (!dateInput) return '';
            const d = new Date(dateInput);
            if (Number.isNaN(d.getTime())) return '';
            const yyyy = String(d.getFullYear()).padStart(4, '0');
            const mm = String(d.getMonth() + 1).padStart(2, '0');
            const dd = String(d.getDate()).padStart(2, '0');
            return `${yyyy}-${mm}-${dd}`;
        };

        setFormData({
            nome: agendamento.nome_cliente || '',
            email: cliente.email || '',
            telefone: cliente.telefone || '',
            data: formatToYYYYMMDD(agendamento.data),
            horario: agendamento.horario || '',
            cpf: cliente.cpf || '',
            descricao: agendamento.descricao || ''
        });
        setError(null);
        setSuccessMessage(null);
    };

    const handleDelete = async (id) => {
        setLoading(true);
        setError(null);
        setSuccessMessage(null);
        try {
            await sessaoAPI.delete(id);
            setSuccessMessage('Agendamento excluído com sucesso!');
            await carregarAgendamentos();
        } catch (err) {
            setError('Erro ao excluir agendamento.');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage(null);
        setLoading(true);

        try {
            // Validações básicas
            if (!formData.nome || !formData.data || !formData.horario) {
                setError('Por favor, preencha todos os campos obrigatórios');
                setLoading(false);
                return;
            }

            // Primeiro, criar ou encontrar o cliente
            let clienteId = null;
            if (editId) {
                // If editing and original cliente exists, reuse it instead of creating a new one
                if (originalClienteId) {
                    clienteId = originalClienteId;
                } else {
                    // No original client - try to create or leave null
                    try {
                        const clienteResponse = await clienteAPI.create({
                            nome: formData.nome,
                            email: formData.email,
                            telefone: formData.telefone,
                            cpf: formData.cpf
                        });
                        clienteId = clienteResponse.id || clienteResponse.data?.id;
                    } catch (clienteErr) {
                        console.error('Erro ao criar cliente:', clienteErr);
                    }
                }
            } else {
                // Creating new session - create client
                try {
                    const clienteResponse = await clienteAPI.create({
                        nome: formData.nome,
                        email: formData.email,
                        telefone: formData.telefone,
                        cpf: formData.cpf
                    });
                    clienteId = clienteResponse.id || clienteResponse.data?.id;
                } catch (clienteErr) {
                    console.error('Erro ao criar cliente:', clienteErr);
                }
            }

            // Depois, criar a sessão/agendamento
            const sessaoData = {
                data: formData.data,
                horario: formData.horario,
                descricao: formData.descricao || null,
                id_cliente_FK: clienteId || null
            };

            if (editId) {
                // Se editId estiver definido, atualiza o agendamento existente
                await sessaoAPI.update(editId, sessaoData);
                setSuccessMessage('Agendamento editado com sucesso!');
            } else {
                // Caso contrário, cria um novo agendamento
                await sessaoAPI.create(sessaoData);
                setSuccessMessage('Agendamento realizado com sucesso!');
            }

            // Limpar formulário
            setFormData({
                nome: '',
                email: '',
                telefone: '',
                data: '',
                horario: '',
                cpf: '',
                descricao: ''
            });
            setEditId(null);
            // Recarregar lista de agendamentos
            await carregarAgendamentos();
        } catch (err) {
            console.error('Erro ao fazer agendamento:', err);
            setError(err.message || 'Erro ao realizar ação. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    // Formata data em yy-mm-dd (ano com duas casas)
    const formatDateYYMMDD = (dateInput) => {
        if (!dateInput) return '';
        const d = new Date(dateInput);
        if (Number.isNaN(d.getTime())) return '';
        const yy = String(d.getFullYear() % 100).padStart(2, '0');
        const mm = String(d.getMonth() + 1).padStart(2, '0');
        const dd = String(d.getDate()).padStart(2, '0');
        return `${yy}-${mm}-${dd}`;
    };

    return (
        <Layout className="agendamento-section">
            <div className='w-full flex gap-8 md:flex-nowrap flex-wrap p-6 bg-card rounded-xl border border-border card-hover smooth-transition'>
                
                {/* Seção de Horários */}
                <section className='agendamento-section__horarios md:w-1/3 w-full'>
                    <header className='mb-6'>
                        <h2 className='text-xl font-semibold text-primary mb-2'>Horários Agendados</h2>
                        <p className='text-sm text-muted-foreground'>Consultas registradas no sistema</p>
                    </header>
                    
                    {loading && horariosAgendados.length === 0 ? (
                        <div className='text-center py-8 text-muted-foreground'>
                            <div className='text-4xl mb-2'>⏳</div>
                            <p>Carregando agendamentos...</p>
                        </div>
                    ) : horariosAgendados.length > 0 ? (
                        <div className='space-y-3 max-h-96 overflow-y-auto'>
                            {horariosAgendados.map((agendamento, index) => (
                                <article 
                                    key={index} 
                                    className='agendamento-section__item p-4 bg-background border border-border rounded-lg'
                                >
                                    <div className='flex justify-between items-start'>
                                        <div>
                                            <h3 className='font-medium text-foreground'>
                                                {agendamento.nome_cliente || 'Sem nome'}
                                            </h3>
                                            <time className='text-sm text-primary'>
                                                {formatDateYYMMDD(agendamento.data)} às {agendamento.horario}
                                            </time>
                                        </div>
                                    </div>
                                    <div className='flex gap-2 mt-2'>
                                        <button
                                            className='px-3 py-1 text-xs rounded bg-blue-100 text-blue-800 hover:bg-blue-200 transition'
                                            onClick={() => handleEdit(agendamento)}
                                            disabled={loading}
                                        >Editar</button>
                                        <button
                                            className='px-3 py-1 text-xs rounded bg-red-100 text-red-800 hover:bg-red-200 transition'
                                            onClick={() => handleDelete(agendamento.id_sessao_PK)}
                                            disabled={loading}
                                        >Excluir</button>
                                    </div>
                                </article>
                            ))}
                        </div>
                    ) : (
                        <div className='text-center py-8 text-muted-foreground'>
                            <div className='text-4xl mb-2'>📅</div>
                            <p>Nenhum agendamento registrado</p>
                            <p className='text-sm mt-1'>Faça seu primeiro agendamento abaixo</p>
                        </div>
                    )}
                </section>
                
                {/* Formulário */}
                <section className='agendamento-section__formulario md:w-2/3 w-full space-y-6'>
                    <header>
                        <h1 className='text-2xl text-foreground font-semibold mb-2'>Agendamento de Consultas</h1>
                        <p className='text-muted-foreground'>Preencha os dados para agendar sua consulta</p>
                    </header>
                    
                    {error && (
                        <div className='p-4 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300 rounded-lg'>
                            {error}
                        </div>
                    )}

                    {successMessage && (
                        <div className='p-4 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 rounded-lg'>
                            {successMessage}
                        </div>
                    )}
                    
                    <form className='space-y-6' onSubmit={handleSubmit}>
                        <div className='grid md:grid-cols-2 grid-cols-1 gap-4'>
                            {camposForm.map((campo, index) => (
                                <div key={index} className="agendamento-section__campo">
                                    <label 
                                        htmlFor={campo.id}
                                        className="block text-sm font-medium text-foreground mb-2"
                                    >
                                        {campo.label}
                                    </label>
                                    <input 
                                        id={campo.id}
                                        type={campo.type} 
                                        placeholder={campo.placeholder}
                                        value={formData[campo.id]}
                                        onChange={handleInputChange}
                                        className="input-focus w-full h-12 border border-border bg-background rounded-lg px-4 
                                                 placeholder:text-muted-foreground text-foreground font-normal smooth-transition" 
                                        aria-required="true"
                                    />
                                </div>
                            ))}
                        </div>
                        
                        {/* Campo de Descrição */}
                        <div className="agendamento-section__campo">
                            <label 
                                htmlFor="descricao"
                                className="block text-sm font-medium text-foreground mb-2"
                            >
                                Descrição dos Sintomas / Motivo da Consulta
                            </label>
                            <textarea 
                                id="descricao"
                                placeholder="Descreva brevemente os sintomas ou motivo da consulta (opcional)"
                                value={formData.descricao}
                                onChange={handleInputChange}
                                className="input-focus w-full border border-border bg-background rounded-lg px-4 py-3 
                                         placeholder:text-muted-foreground text-foreground font-normal smooth-transition"
                                rows="4"
                                aria-required="false"
                            />
                        </div>
                        
                        <button 
                            type="submit"
                            disabled={loading}
                            className='cosmic-button md:w-auto w-full px-8 py-3 text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed'
                            aria-label="Confirmar agendamento da consulta"
                        >
                            {loading ? 'Agendando...' : 'Agendar Consulta'}
                        </button>
                    </form>
                </section>
            </div>
        </Layout>
    );
};