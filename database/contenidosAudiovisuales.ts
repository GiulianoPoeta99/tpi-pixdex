export interface IContenidoAudiovisual {
  id: number;
  nombre: string;
  descripcion: string;
  generos: number[];
  tipoId: number;
  imageUrl: string | number;
}

export const contenidosAudiovisuales: IContenidoAudiovisual[] = [
  {
    id: 1,
    nombre: 'Breaking Bad',
    descripcion:
      'Un profesor de química se convierte en fabricante de metanfetaminas.',
    generos: [1, 3, 10],
    tipoId: 1,
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqhGRPHbiT9WRbp4Mc7kKgT6LHSPHrDiWfEg&s',
  },
  {
    id: 2,
    nombre: 'Stranger Things',
    descripcion:
      'Un grupo de niños se enfrenta a fuerzas sobrenaturales en su ciudad.',
    generos: [1, 4, 8],
    tipoId: 1,
    imageUrl:
      'https://m.media-amazon.com/images/M/MV5BMjg2NmM0MTEtYWY2Yy00NmFlLTllNTMtMjVkZjEwMGVlNzdjXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
  },
  {
    id: 3,
    nombre: 'Friends',
    descripcion:
      'Seis amigos viven las altas y bajas de la vida en Nueva York.',
    generos: [2, 1],
    tipoId: 1,
    imageUrl:
      'https://m.media-amazon.com/images/M/MV5BOTU2YmM5ZjctOGVlMC00YTczLTljM2MtYjhlNGI5YWMyZjFkXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
  },
  {
    id: 4,
    nombre: 'The Office',
    descripcion:
      'La vida cotidiana en una oficina de papel con mucho humor absurdo.',
    generos: [2],
    tipoId: 1,
    imageUrl:
      'https://m.media-amazon.com/images/M/MV5BZjQwYzBlYzUtZjhhOS00ZDQ0LWE0NzAtYTk4MjgzZTNkZWEzXkEyXkFqcGc@._V1_.jpg',
  },
  {
    id: 5,
    nombre: 'Game of Thrones',
    descripcion: 'Familias nobles luchan por el control de los Siete Reinos.',
    generos: [1, 6, 5],
    tipoId: 1,
    imageUrl:
      'https://m.media-amazon.com/images/M/MV5BMTNhMDJmNmYtNDQ5OS00ODdlLWE0ZDAtZTgyYTIwNDY3OTU3XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
  },
  {
    id: 6,
    nombre: 'Dark',
    descripcion:
      'Desapariciones en un pueblo alemán revelan oscuros secretos temporales.',
    generos: [8, 1, 4],
    tipoId: 1,
    imageUrl:
      'https://www.lavanguardia.com/peliculas-series/images/serie/poster/2017/12/w1280/hRP7N2uI0pokxnkcMFONoOZnxbv.jpg',
  },
  {
    id: 7,
    nombre: 'The Crown',
    descripcion: 'Dramatización de la vida de la reina Isabel II.',
    generos: [1, 15],
    tipoId: 1,
    imageUrl:
      'https://m.media-amazon.com/images/M/MV5BODcyODZlZDMtZGE0Ni00NjBhLWJlYTAtZDdlNWY3MzkwMGVhXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
  },
  {
    id: 8,
    nombre: 'Sherlock',
    descripcion: 'Una moderna adaptación de Sherlock Holmes.',
    generos: [8, 1],
    tipoId: 1,
    imageUrl:
      'https://m.media-amazon.com/images/M/MV5BNTQzNGZjNDEtOTMwYi00MzFjLWE2ZTYtYzYxYzMwMjZkZDc5XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
  },
  {
    id: 9,
    nombre: 'The Boys',
    descripcion:
      'Un grupo busca exponer los crímenes de superhéroes corruptos.',
    generos: [3, 11, 10],
    tipoId: 1,
    imageUrl:
      'https://m.media-amazon.com/images/M/MV5BMWJlN2U5MzItNjU4My00NTM2LWFjOWUtOWFiNjg3ZTMxZDY1XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
  },
  {
    id: 10,
    nombre: 'Better Call Saul',
    descripcion: 'El origen del abogado de Breaking Bad.',
    generos: [1, 10],
    tipoId: 1,
    imageUrl:
      'https://www.aceprensa.com/wp-content/uploads/2015/10/60059-1.jpg',
  },
  {
    id: 11,
    nombre: 'How I Met Your Mother',
    descripcion: 'Un hombre cuenta a sus hijos cómo conoció a su madre.',
    generos: [2, 9],
    tipoId: 1,
    imageUrl:
      'https://static.wikia.nocookie.net/himym/images/4/46/HIMYM_poster.jpg/revision/latest?cb=20220215204714',
  },
  {
    id: 12,
    nombre: 'The Witcher',
    descripcion:
      'Un cazador de monstruos lucha por encontrar su lugar en un mundo brutal.',
    generos: [5, 6, 1],
    tipoId: 1,
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9l0qTSnfSABEG9p9ZJqMeLaqaMBQAQvyufQ&s',
  },
  {
    id: 13,
    nombre: 'House of Cards',
    descripcion: 'Un político ambicioso trama su camino hacia el poder.',
    generos: [1, 10],
    tipoId: 1,
    imageUrl:
      'https://m.media-amazon.com/images/M/MV5BMTQ4MDczNDYwNV5BMl5BanBnXkFtZTcwNjMwMDk5OA@@._V1_.jpg',
  },
  {
    id: 14,
    nombre: 'Peaky Blinders',
    descripcion:
      'Una familia criminal británica después de la Primera Guerra Mundial.',
    generos: [1, 3, 15],
    tipoId: 1,
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOvDSoGSlHJ8gvE3JpgnSSLh9vLdpL6DRcVA&s',
  },
  {
    id: 15,
    nombre: 'Inception',
    descripcion: 'Un ladrón entra en los sueños de otros para robar secretos.',
    generos: [4, 10, 1],
    tipoId: 2,
    imageUrl:
      'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_FMjpg_UX1000_.jpg',
  },
  {
    id: 16,
    nombre: 'The Matrix',
    descripcion: 'Un hacker descubre la verdad sobre su realidad simulada.',
    generos: [4, 3],
    tipoId: 2,
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfSjSWOCaw5dnDL2GT1zFd9RMCgUGw5Q2Cfg&s',
  },
  {
    id: 17,
    nombre: 'Pulp Fiction',
    descripcion: 'Historias entrelazadas de crimen en Los Ángeles.',
    generos: [1, 2, 10],
    tipoId: 2,
    imageUrl:
      'https://m.media-amazon.com/images/M/MV5BYTViYTE3ZGQtNDBlMC00ZTAyLTkyODMtZGRiZDg0MjA2YThkXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
  },
  {
    id: 18,
    nombre: 'Titanic',
    descripcion: 'Un amor trágico a bordo del famoso barco.',
    generos: [1, 9, 15],
    tipoId: 2,
    imageUrl:
      'https://m.media-amazon.com/images/M/MV5BYzYyN2FiZmUtYWYzMy00MzViLWJkZTMtOGY1ZjgzNWMwN2YxXkEyXkFqcGc@._V1_.jpg',
  },
  {
    id: 19,
    nombre: 'The Dark Knight',
    descripcion: 'Batman enfrenta al temible Joker en Ciudad Gótica.',
    generos: [3, 11, 10],
    tipoId: 2,
    imageUrl:
      'https://m.media-amazon.com/images/S/pv-target-images/e9a43e647b2ca70e75a3c0af046c4dfdcd712380889779cbdc2c57d94ab63902.jpg',
  },
  {
    id: 20,
    nombre: 'Forrest Gump',
    descripcion:
      'Un hombre simple vive momentos clave de la historia de EE.UU.',
    generos: [1, 2, 15],
    tipoId: 2,
    imageUrl:
      'https://i.pinimg.com/736x/52/29/99/5229997934b5b5acfa512b32db0091fd.jpg',
  },
  {
    id: 21,
    nombre: 'Interstellar',
    descripcion:
      'Astronautas viajan a través de un agujero de gusano para salvar a la humanidad.',
    generos: [4, 1, 5],
    tipoId: 2,
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyEQSNpbDsHQd08ZAx-l2E1h5uXxNErtBz3A&s',
  },
  {
    id: 22,
    nombre: 'Fight Club',
    descripcion: 'Un hombre crea un club de lucha secreto que cambia su vida.',
    generos: [1, 10],
    tipoId: 2,
    imageUrl:
      'https://m.media-amazon.com/images/M/MV5BOTgyOGQ1NDItNGU3Ny00MjU3LTg2YWEtNmEyYjBiMjI1Y2M5XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
  },
  {
    id: 23,
    nombre: 'Gladiator',
    descripcion: 'Un general romano busca venganza como gladiador.',
    generos: [3, 15, 1],
    tipoId: 2,
    imageUrl:
      'https://m.media-amazon.com/images/M/MV5BYWQ4YmNjYjEtOWE1Zi00Y2U4LWI4NTAtMTU0MjkxNWQ1ZmJiXkEyXkFqcGc@._V1_.jpg',
  },
  {
    id: 24,
    nombre: 'The Godfather',
    descripcion: 'La historia de una poderosa familia mafiosa.',
    generos: [1, 10, 15],
    tipoId: 2,
    imageUrl:
      'https://m.media-amazon.com/images/M/MV5BNGEwYjgwOGQtYjg5ZS00Njc1LTk2ZGEtM2QwZWQ2NjdhZTE5XkEyXkFqcGc@._V1_.jpg',
  },
  {
    id: 25,
    nombre: 'Avengers: Endgame',
    descripcion: 'Los Vengadores enfrentan la batalla final contra Thanos.',
    generos: [3, 11, 4],
    tipoId: 2,
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdwwvagArkrVCOASllUfjgkLow55SakU0sow&s',
  },
  {
    id: 26,
    nombre: 'Parasite',
    descripcion:
      'Una familia pobre se infiltra en la vida de una familia rica.',
    generos: [1, 10],
    tipoId: 2,
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/ima ges?q=tbn:ANd9GcTcyJYd_sWzQdj87gwIiDRpi6JtzfY6-XLG-w&s',
  },
  {
    id: 27,
    nombre: 'La La Land',
    descripcion:
      'Una historia de amor entre un pianista y una actriz en Los Ángeles.',
    generos: [2, 9],
    tipoId: 2,
    imageUrl:
      'https://m.media-amazon.com/images/M/MV5BMzUzNDM2NzM2MV5BMl5BanBnXkFtZTgwNTM3NTg4OTE@._V1_FMjpg_UX1000_.jpg',
  },
  {
    id: 28,
    nombre: 'Joker',
    descripcion: 'El origen del famoso villano de Gotham.',
    generos: [1, 10],
    tipoId: 2,
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWnfRvL2Agr1BMFJZn-OcGrozTKU3wWFYGAw&s',
  },
  {
    id: 29,
    nombre: 'Naruto',
    descripcion: 'Un joven ninja busca convertirse en el líder de su aldea.',
    generos: [13, 5, 6],
    tipoId: 3,
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUuxa5g8DAZZQpTQvCl0Vme1XacaX-f4AuogF5KD94ULLViEW7lQk4FDyhaLsFkTZz-wc&usqp=CAU',
  },
  {
    id: 30,
    nombre: 'Attack on Titan',
    descripcion: 'Humanos luchan por sobrevivir contra titanes gigantes.',
    generos: [3, 10, 13],
    tipoId: 3,
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBw7hV7aa2wVdL-lggddX_oBSbokJ0Kn-Fcg&s',
  },
  {
    id: 31,
    nombre: 'One Piece',
    descripcion: 'Piratas buscan el tesoro legendario llamado One Piece.',
    generos: [5, 6, 13],
    tipoId: 3,
    imageUrl:
      'https://images.justwatch.com/poster/310515848/s718/one-piece.jpg',
  },
  {
    id: 32,
    nombre: 'Death Note',
    descripcion: 'Un estudiante obtiene un cuaderno con el poder de matar.',
    generos: [8, 10, 13],
    tipoId: 3,
    imageUrl:
      'https://m.media-amazon.com/images/M/MV5BYTgyZDhmMTEtZDFhNi00MTc4LTg3NjUtYWJlNGE5Mzk2NzMxXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
  },
  {
    id: 33,
    nombre: 'Fullmetal Alchemist: Brotherhood',
    descripcion: 'Dos hermanos alquimistas buscan la Piedra Filosofal.',
    generos: [5, 6, 13],
    tipoId: 3,
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsWp_oYo3pRAzDLqR-Cj6JjaUU6Y1RdoeaoQ&s',
  },
  {
    id: 34,
    nombre: 'My Hero Academia',
    descripcion:
      'En un mundo con superpoderes, un chico sin dones quiere ser héroe.',
    generos: [11, 13, 3],
    tipoId: 3,
    imageUrl:
      'https://m.media-amazon.com/images/M/MV5BNzgxMzI3NzgtYzE2Zi00MzlmLThlNWEtNWVmZWEyZjNkZWYyXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
  },
  {
    id: 35,
    nombre: 'Demon Slayer',
    descripcion: 'Un joven caza demonios tras perder a su familia.',
    generos: [3, 6, 13],
    tipoId: 3,
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWRaIUYW6W8mWGutUKJkRbKn2rOkYq9HN4Dg&s',
  },
  {
    id: 36,
    nombre: 'Jujutsu Kaisen',
    descripcion: 'Estudiantes de hechicería luchan contra maldiciones.',
    generos: [3, 6, 13],
    tipoId: 3,
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8uMcJ2ua3TOb8tu9SANwon4Yp1jgHNrwm3w&s',
  },
  {
    id: 37,
    nombre: 'Dragon Ball Z',
    descripcion: 'Guerreros protegen la Tierra de amenazas cósmicas.',
    generos: [3, 13, 6],
    tipoId: 3,
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDKmPkKz7qe4UF0X5eHIFM1Qwe-AY2bRaq6g&s',
  },
  {
    id: 38,
    nombre: 'Cowboy Bebop',
    descripcion:
      'Cazarrecompensas viajan por el espacio enfrentando su pasado.',
    generos: [4, 5, 13],
    tipoId: 3,
    imageUrl:
      'https://m.media-amazon.com/images/M/MV5BM2VhZjk2MWMtZjc2OC00YzA4LWI0NzAtZGQ1YjVkOTk5YzVlXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
  },
  {
    id: 39,
    nombre: 'Tokyo Ghoul',
    descripcion:
      'Un estudiante se transforma en mitad ghoul tras un accidente.',
    generos: [7, 10, 13],
    tipoId: 3,
    imageUrl:
      'https://i5.walmartimages.com/asr/d597957c-351d-4903-82ff-d52a66aed94a.73a05cb85fdaf2b6a80beb38a5a7f550.jpeg',
  },
  {
    id: 40,
    nombre: 'Bleach',
    descripcion:
      'Un joven obtiene poderes para luchar contra espíritus malignos.',
    generos: [3, 6, 13],
    tipoId: 3,
    imageUrl:
      'https://static.wikia.nocookie.net/doblaje/images/a/a6/Bleach_%28anime%29.png/revision/latest?cb=20220116194311&path-prefix=es',
  },
  {
    id: 41,
    nombre: 'Steins;Gate',
    descripcion: 'Un grupo descubre cómo enviar mensajes al pasado.',
    generos: [4, 10, 8],
    tipoId: 3,
    imageUrl:
      'https://m.media-amazon.com/images/M/MV5BZjI1YjZiMDUtZTI3MC00YTA5LWIzMmMtZmQ0NTZiYWM4NTYwXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
  },
  {
    id: 42,
    nombre: 'Mob Psycho 100',
    descripcion: 'Un joven psíquico intenta vivir una vida normal.',
    generos: [2, 11, 13],
    tipoId: 3,
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1E7nLIqKxzIdD_pQAgzch0cfwMFSAEgBzrA&s',
  },
  {
    id: 43,
    nombre: 'Haikyuu',
    descripcion: 'Un equipo de voleibol lucha por llegar a la cima.',
    generos: [12, 1, 13],
    tipoId: 3,
    imageUrl:
      'https://m.media-amazon.com/images/M/MV5BYjYxMWFlYTAtYTk0YS00NTMxLWJjNTQtM2E0NjdhYTRhNzE4XkEyXkFqcGc@._V1_.jpg',
  },
  {
    id: 44,
    nombre: 'Clannad',
    descripcion:
      'Un estudiante problemático cambia su vida al conocer a una chica especial.',
    generos: [1, 9, 12],
    tipoId: 3,
    imageUrl:
      'https://m.media-amazon.com/images/M/MV5BMWJiNDQzNGEtNTA3Zi00NjM2LWE2NTAtOTU0NzA4ZmJiMjhmXkEyXkFqcGc@._V1_.jpg',
  },
  {
    id: 45,
    nombre: 'Neon Genesis Evangelion',
    descripcion: 'Adolescentes pilotan mechas para salvar al mundo.',
    generos: [14, 4, 13],
    tipoId: 3,
    imageUrl:
      'https://m.media-amazon.com/images/M/MV5BMGRiOWQyOTAtZDQ0Ny00NGRiLWIyYTYtZWM1MjNjNzg0ZjE3XkEyXkFqcGc@._V1_.jpg',
  },
];
