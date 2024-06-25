import { useContext, useEffect, useMemo } from "react";
import { CarrinhoContext } from "@/context/CarrinhoContext";

export const useCarrinhoContext = () => {
  const { carrinho, 
  setCarrinho, 
  quantidade,
  setQuantidade,
  valorTotal,
  setValorTotal } = useContext(CarrinhoContext);
  
  function mudarQuantidade(id, quantidade) {
    return carrinho.map((itemDoCarrinho) => {
      if (itemDoCarrinho.id === id) itemDoCarrinho.quantidade += quantidade;
      return itemDoCarrinho;
    });
  }
  
  function adicionarProduto(novoProduto) {
    const temOProduto = carrinho.some((itemDoCarrinho) => (
      itemDoCarrinho.id === novoProduto.id
    ));
    
    if (!temOProduto) {
      novoProduto.quantidade = 1;
      return setCarrinho((carrinhoAnterior) => [
        ...carrinhoAnterior,
        novoProduto
      ]);
    }
    
    const carrinhoAtualizado = mudarQuantidade(novoProduto.id, 1);
    
    setCarrinho([...carrinhoAtualizado]);
  }
  
  function removerProduto(idProduto) {
      const estaNoCarrinho = carrinho.find((itemDoCarrinho) => itemDoCarrinho.id === idProduto);
      
      if (!estaNoCarrinho) {
        return;
      }
      
      if (estaNoCarrinho.quantidade === 1) {
        setCarrinho(carrinhoAnterior => carrinhoAnterior.filter(itemDoCarrinho => itemDoCarrinho.id === idProduto));
      } else {
        const carrinhoAtualizado = mudarQuantidade(idProduto, -1);
        setCarrinho([...carrinhoAtualizado]);
     }
   }
   
   function removerProdutoCarrinho(id){
    const produto = carrinho.filter((itemDoCarrinho) => itemDoCarrinho.id !== id);
    setCarrinho(produto);
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