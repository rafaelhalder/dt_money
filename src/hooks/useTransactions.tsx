import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';

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
    createTransaction: (transaction: TransactionInput) => Promise<void>;

}


const TransactionsContext = createContext<TransactionContextData>(
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

     async function createTransaction(transactionInput: TransactionInput){
      const response = await api.post('transactions', {
          ...transactionInput,
          createdAt: new Date()
        });
        
      const {transaction } = response.data;

      setTransactions([
          ...transactions,
              transaction
      ])
    }

    return (
        <TransactionsContext.Provider value={{transactions, createTransaction}}>
            {children}
        </TransactionsContext.Provider>
    );

}

export function useTransactions(){
    const context = useContext(TransactionsContext);

    return context;
}