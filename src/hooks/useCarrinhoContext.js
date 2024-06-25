import { useContext, useEffect, useMemo } from "react";
import { CarrinhoContext } from "@/context/CarrinhoContext";

import { ADD_PRODUTO, REMOVE_PRODUTO, UPDATE_QUANTIDADE } from "@/reducers/carrinhoReducer";

const addProdutoAction = (novoProduto) => ({
  type: ADD_PRODUTO,
  payload: novoProduto,
});

const removeProdutoAction = (produtoId) => ({
  type: REMOVE_PRODUTO,
  payload: produtoId,
});

const updateQuantidadeAction = (produtoId, quantidade) => ({
  type: UPDATE_QUANTIDADE,
  payload: { produtoId, quantidade },
});

export const useCarrinhoContext = () => {
  const { carrinho,
  dispatch,
  quantidade,
  valorTotal } = useContext(CarrinhoContext);
  
  function mudarQuantidade(id, quantidade) {
    return carrinho.map((itemDoCarrinho) => {
      if (itemDoCarrinho.id === id) itemDoCarrinho.quantidade += quantidade;
      return itemDoCarrinho;
    });
  }
  
  function adicionarProduto(novoProduto) {
    dispatch(addProdutoAction(novoProduto));
  }
  
  function removerProduto(idProduto) {
    const produto = carrinho.find((item) => item.id === id);

    if (produto && produto.quantidade > 1) {
      dispatch(updateQuantidadeAction(id, produto.quantidade - 1));
    } else {
      dispatch(removeProdutoAction(id));
    }
  }
   
   function removerProdutoCarrinho(id){
    dispatch(removeProdutoAction(id));
   }
   
   const { totalTemporario, quantidadeTemporaria } = useMemo(() => {
    return carrinho.reduce((acumulador, produto) => ({
      quantidadeTemporaria: acumulador.quantidadeTemporaria + produto.quantidade,
      totalTemporario: acumulador.totalTemporario + produto.preco * produto.quantidade
    }),
    {
      quantidadeTemporaria: 0,
      totalTemporario: 0
    }
    );
   }, [carrinho]);
   
   useEffect(() => {
    setQuantidade(quantidadeTemporaria);
    setValorTotal(totalTemporario);
   });
   
   return {
    carrinho,
    setCarrinho,
    valorTotal,
    setValorTotal,
    quantidade,
    setQuantidade,
    adicionarProduto,
    removerProduto,
    removerProdutoCarrinho,
   }
}