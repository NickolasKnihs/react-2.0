import { useState } from "react";

function Tarefas() {

    const [listaTarefas, setListarefas] = useState([]);

    function adicionaTarefa () {
        listaTarefas.push(
                {
                    descricao: 'Tarefa',
                    finalizado: false

                }
            );
        setListarefas(listaTarefas.slice());
        console.log('AdicionarTarefa', listaTarefas);
        console.log('Cadastrado');
    };

    function atualizarTarefa(tarefaAtual){
        tarefaAtual.finalizado = !tarefaAtual.finalizado;
        setListarefas(listaTarefas.slice());
        // if (tarefaAtual.finalizado) {
        //     tarefaAtual.finalizado = false;
        // } else {
        //     tarefaAtual.finalizado = true
        // }
    }

    function pegaEstilo(tarefaAtual){
        if (tarefaAtual.finalizado){
            return 'line-through';
        }
        return 'none';
    }

    return (
        <div>
            <button onClick={adicionaTarefa}>Cadastrar</button>
            <br />
            <div>
                {
                    listaTarefas.map(tarefaAtual => {
                        return <div style={
                            {
                                margin: '10px',
                                color: 'white',
                                backgroundColor: 'gray',
                                textDecoration: pegaEstilo(tarefaAtual)
                            }
                        } onClick={() => atualizarTarefa(tarefaAtual)}>{tarefaAtual.descricao}</div>
                    })
                }
            </div>
        </div>
    );

}

export default Tarefas;