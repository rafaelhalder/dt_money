import { useEffect } from "react"
import { api } from "../../services/api";
import { Container } from "./styles"

export function TransactionsTable(){

    useEffect(() => {
        api.get('transactions')
        .then(response => console.log(response.data))
    },
    [] //<== quando colocado vazio será executado apenas uma vez
    );
    return(
        <Container>
            <table>
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Valor</th>
                        <th>Categoria</th>
                        <th>Data</th>
                    </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Desenvolvimento de website</td>
                    <td className="deposit">R$12.0000</td>
                    <td>Dev</td>
                    <td>20/01/01</td>
                    </tr>
                    <tr>
                    <td>Desenvolvimento de website</td>
                    <td className="withdraw">R$12.0000</td>
                    <td>Dev</td>
                    <td>20/01/01</td>
                    </tr>
                </tbody>
            </table>

        </Container>
    )
}