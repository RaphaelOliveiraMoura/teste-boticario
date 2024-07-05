-- Inserindo dados na tabela categoria
INSERT INTO public.categoria (nome_categoria, descricao_categoria) VALUES
('Eletrônicos', 'Produtos eletrônicos em geral'),
('Roupas', 'Vestuário para todas as idades'),
('Livros', 'Livros de diversos gêneros'),
('Móveis', 'Móveis para casa e escritório'),
('Alimentos', 'Produtos alimentícios e bebidas');

-- Inserindo dados na tabela endereco
INSERT INTO public.endereco (cep, rua, bairro, cidade, numero, complemento, uf) VALUES
('12345-678', 'Rua das Flores', 'Centro', 'São Paulo', '100', 'Apto 101', 'SP'),
('87654-321', 'Av. Paulista', 'Bela Vista', 'São Paulo', '2000', '', 'SP'),
('11223-445', 'Rua das Acácias', 'Jardim', 'Rio de Janeiro', '300', '', 'RJ'),
('33445-667', 'Av. Atlântica', 'Copacabana', 'Rio de Janeiro', '4000', 'Cobertura', 'RJ'),
('55667-889', 'Rua das Palmeiras', 'Centro', 'Belo Horizonte', '500', '', 'MG');

-- Inserindo dados na tabela cliente
INSERT INTO public.cliente (email, username, senha, nome, cpf, telefone, data_nascimento, endereco_id) VALUES
('joao@example.com', 'joaodasilva', 'senha123', 'João da Silva', '12345678901', '11987654321', '1980-01-01', 1),
('maria@example.com', 'mariasantos', 'senha456', 'Maria dos Santos', '23456789012', '21987654322', '1985-02-02', 2),
('carlos@example.com', 'carlospereira', 'senha789', 'Carlos Pereira', '34567890123', '31987654323', '1990-03-03', 3),
('ana@example.com', 'anacosta', 'senha012', 'Ana Costa', '45678901234', '41987654324', '1995-04-04', 4),
('lucas@example.com', 'lucasrocha', 'senha345', 'Lucas Rocha', '56789012345', '51987654325', '2000-05-05', 5);

-- Inserindo dados na tabela produto
INSERT INTO public.produto (nome_produto, descricao_produto, preco_produto, qtd_estoque, categoria_id, imagem) VALUES
('Smartphone', 'Smartphone de última geração', 1999.99, 50, 1, 'smartphone.jpg'),
('Camiseta', 'Camiseta 100% algodão', 49.99, 200, 2, 'camiseta.jpg'),
('Livro de Ficção', 'Romance de ficção científica', 29.99, 100, 3, 'livro_ficcao.jpg'),
('Sofá', 'Sofá de 3 lugares', 999.99, 10, 4, 'sofa.jpg'),
('Pizza', 'Pizza de mussarela', 29.99, 50, 5, 'pizza.jpg');

-- Inserindo dados na tabela pedido
INSERT INTO public.pedido (numero_pedido, valor_total_pedido, data_pedido, status, cliente_id) VALUES
(1001, 2079.97, '2024-01-01', true, 1),
(1002, 999.99, '2024-02-02', false, 2),
(1003, 1079.98, '2024-03-03', true, 3),
(1004, 39.98, '2024-04-04', true, 4),
(1005, 29.99, '2024-05-05', false, 5);

-- Inserindo dados na tabela produto_pedido
INSERT INTO public.produto_pedido (qtd_produto_pedido, preco_produto_pedido, produto_id, pedido_id) VALUES
(1, 1999.99, 1, 1),
(1, 49.99, 2, 1),
(1, 999.99, 4, 2),
(1, 1999.99, 1, 3),
(1, 79.99, 2, 3),
(1, 9.99, 2, 4),
(1, 29.99, 5, 5);

