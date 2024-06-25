import { createContext, useState, useReducer } from "react";

export const CarrinhoContext = createContext();

const estadoInicial = [];
export const CarrinhoProvider = ({ children }) => {
  const [carrinho, dispatch] = useReducer(carrinhoReducer, estadoInicial);
  const [quantidade, setQuantidade] = useState(0);
  const [valorTotal, setValorTotal] = useState(0);
  
  return (
    <CarrinhoContext.Provider value={{ 
      carrinho,
      dispatch,
      quantidade,
      valorTotal,
    }}>
      {children}
    </CarrinhoContext.Provider>
  );
}