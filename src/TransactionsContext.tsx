import { createContext, ReactNode, useEffect, useState } from 'react';
import { api } from './services/api';

interface Transaction {
    id: number,
    title: string,
    createdAt: string,
    amount: number,
    type: string,
    category: string,
}

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>; // igual interface mas pega todos os valores dela MENOS ID E CREATEDAT

interface TransactionsProviderProps {
    children: ReactNode;
}

interface TransactionContextData {

    transactions: Transaction[];
    createTransaction: (transaction: TransactionInput) => void;

}


export const TransactionsContext = createContext<TransactionContextData>(
    {} as TransactionContextData
    );

export function TransactionsProvider({children}: TransactionsProviderProps){

const [transactions, setTransactions] = useState<Transaction[]>([]);


    useEffect(() => {
        api.get('transactions')
            .then(response => setTransactions(response.data.transactions))
    },
        [] //<== quando colocado vazio será executado apenas uma vez 
    );

    function createTransaction(transaction: TransactionInput){
        api.post('transactions', transaction);
    }

    return (
        <TransactionsContext.Provider value={{transactions, createTransaction}}>
            {children}
        </TransactionsContext.Provider>
    );

}