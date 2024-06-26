import { useRef, useState, useEffect } from "react";

function Tarefas() {

    const [listaTarefas, setListarefas] = useState([]);
    const [modoEdicao, setModoEdicao] = useState(false);
    const [descricaoEditada, setDescricaoEditada] = useState("");
    const [indiceEditado, setIndiceEditado] = useState(null);
    const descricaoTarefaInputRef = useRef();

    useEffect(() => {
        const tarefasSalvas = JSON.parse(localStorage.getItem("tarefas"));
        if (tarefasSalvas) {
            setListarefas(tarefasSalvas);
        }
    }, []);

    function adicionaTarefa () {
        if (modoEdicao) {
            const novasTarefas = [...listaTarefas];
            novasTarefas[indiceEditado].descricao = descricaoTarefaInputRef.current.value;
            setListarefas(novasTarefas);
            salvarTarefas(novasTarefas);
            setModoEdicao(false);
            setDescricaoEditada("");
            setIndiceEditado(null);
        } else {
            const novaTarefa = {
                descricao: descricaoTarefaInputRef.current.value,
                finalizado: false
            };
            setListarefas([...listaTarefas, novaTarefa]);
            descricaoTarefaInputRef.current.value = '';
            salvarTarefas([...listaTarefas, novaTarefa]);
        }
    };

    function editarTarefa(indice, descricao) {
        setModoEdicao(true);
        setDescricaoEditada(descricao);
        setIndiceEditado(indice);
        descricaoTarefaInputRef.current.value = descricao;
    }

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

    function excluirTarefa(tarefaExcluir) {
        const novasTarefas = listaTarefas.filter(tarefa => tarefa !== tarefaExcluir);
        setListarefas(novasTarefas);
        salvarTarefas(novasTarefas);
    }

    function pegaEstilo(tarefaAtual){
        return tarefaAtual.finalizado ? 'line-through' : 'none';
    }

    function salvarTarefas(tarefas) {
        localStorage.setItem("tarefas", JSON.stringify(tarefas));
    }

    return (
        <div>
            <input type="text" ref={descricaoTarefaInputRef} />
            <button onClick={adicionaTarefa}>{modoEdicao ? "Salvar" : "Cadastrar"}</button>
            <br />
            <div>
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
                            <button onClick={() => editarTarefa(index, tarefaAtual.descricao)}>Editar</button>
                            <button onClick={() => excluirTarefa(tarefaAtual)}>Excluir</button>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default Tarefas;
