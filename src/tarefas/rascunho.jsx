import { useRef, useState, useEffect } from "react";

function Tarefas() {

    // Estado para armazenar a lista de tarefas
    const [listaTarefas, setListarefas] = useState([]);
    // Estado para controlar o modo de edição
    const [modoEdicao, setModoEdicao] = useState(false);
    // Estado para armazenar a descrição editada
    const [descricaoEditada, setDescricaoEditada] = useState("");
    // Estado para armazenar o índice da tarefa em edição
    const [indiceEditado, setIndiceEditado] = useState(null);
    // Referência ao input de descrição da tarefa
    const descricaoTarefaInputRef = useRef();

    // Efeito que carrega as tarefas salvas no localStorage ao carregar a página
    useEffect(() => {
        const tarefasSalvas = JSON.parse(localStorage.getItem("tarefas"));
        if (tarefasSalvas) {
            setListarefas(tarefasSalvas);
        }
    }, []);

    // Função para adicionar uma nova tarefa ou salvar uma tarefa editada
    function adicionaTarefa () {
        // Se estiver no modo de edição
        if (modoEdicao) {
            // Cria uma cópia da lista de tarefas
            const novasTarefas = [...listaTarefas];
            // Atualiza a descrição da tarefa no índice editado com o novo valor do input
            novasTarefas[indiceEditado].descricao = descricaoTarefaInputRef.current.value;
            // Atualiza o estado com a lista de tarefas modificada
            setListarefas(novasTarefas);
            // Salva as tarefas no localStorage
            salvarTarefas(novasTarefas);
            // Desativa o modo de edição e limpa os estados relacionados à edição
            setModoEdicao(false);
            setDescricaoEditada("");
            setIndiceEditado(null);
        } else {
            // Se não estiver no modo de edição, adiciona uma nova tarefa à lista
            const novaTarefa = {
                descricao: descricaoTarefaInputRef.current.value,
                finalizado: false
            };
            setListarefas([...listaTarefas, novaTarefa]);
            descricaoTarefaInputRef.current.value = '';
            salvarTarefas([...listaTarefas, novaTarefa]);
        }
    };

    // Função para iniciar o modo de edição de uma tarefa
    function editarTarefa(indice, descricao) {
        setModoEdicao(true);
        setDescricaoEditada(descricao);
        setIndiceEditado(indice);
        descricaoTarefaInputRef.current.value = descricao;
    }

    // Função para marcar uma tarefa como finalizada ou não finalizada
    function atualizarTarefa(tarefaAtual){
        const novasTarefas = listaTarefas.map(tarefa => {
            if (tarefa === tarefaAtual) {
                return { ...tarefa, finalizado: !tarefa.finalizado };
            }
            return tarefa;
        });
        setListarefas(novasTarefas);
        salvarTarefas(novasTarefas);
    }

    // Função para excluir uma tarefa da lista
    function excluirTarefa(tarefaExcluir) {
        const novasTarefas = listaTarefas.filter(tarefa => tarefa !== tarefaExcluir);
        setListarefas(novasTarefas);
        salvarTarefas(novasTarefas);
    }

    // Função para definir o estilo da descrição da tarefa (riscado ou normal)
    function pegaEstilo(tarefaAtual){
        return tarefaAtual.finalizado ? 'line-through' : 'none';
    }

    // Função para salvar as tarefas no localStorage
    function salvarTarefas(tarefas) {
        localStorage.setItem("tarefas", JSON.stringify(tarefas));
    }

    // Renderização da interface
    return (
        <div>
            {/* Input para adicionar a descrição da tarefa */}
            <input type="text" ref={descricaoTarefaInputRef} />
            {/* Botão para adicionar ou salvar a tarefa */}
            <button onClick={adicionaTarefa}>{modoEdicao ? "Salvar" : "Cadastrar"}</button>
            <br />
            <div>
                {/* Mapeamento das tarefas para exibição na lista */}
                {
                    listaTarefas.map((tarefaAtual, index) => (
                        <div
                            key={tarefaAtual.descricao}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                margin: '10px'
                            }}
                        >
                            {/* Div para exibir a descrição da tarefa */}
                            <div
                                style={{
                                    flex: '1',
                                    color: 'white',
                                    backgroundColor: 'gray',
                                    textDecoration: pegaEstilo(tarefaAtual),
                                    marginRight: '10px',
                                    padding: '5px'
                                }}
                                onClick={() => atualizarTarefa(tarefaAtual)}
                            >
                                {tarefaAtual.descricao}
                            </div>
                            {/* Botão para editar a tarefa */}
                            <button onClick={() => editarTarefa(index, tarefaAtual.descricao)}>Editar</button>
                            {/* Botão para excluir a tarefa */}
                            <button onClick={() => excluirTarefa(tarefaAtual)}>Excluir</button>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default Tarefas;
