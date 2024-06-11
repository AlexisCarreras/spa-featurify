export const details = [
  {
    title: "Danceability (Bailabilidad):",
    text: "Describe qué tan adecuada es una pista para bailar en función de una combinación de elementos musicales que incluyen el tempo, la estabilidad del ritmo, la fuerza del ritmo y la regularidad general. Un valor de 0,0 es el menos bailable y 1,0 es el más bailable.",
  },
  {
    title: "Energy (Energía):",
    text: "Representa una medida perceptiva de intensidad y actividad. Normalmente, las pistas enérgicas se sienten rápidas y ruidosas. Por ejemplo, el death metal tiene mucha energía, mientras que un preludio de Bach obtiene una puntuación baja en la escala. Las características de percepción que contribuyen a este atributo incluyen rango dinámico, volumen percibido, timbre, velocidad de inicio y entropía general. Su valor es entre 0,0 y 1,0",
  },
  // {
  //   title: "Loudness (Volumen):",
  //   text: "El volumen general de una pista en decibeles (dB). Los valores de sonoridad se promedian en toda la pista y son útiles para comparar el volumen relativo de las pistas. El volumen es la cualidad de un sonido que es el principal correlato psicológico de la fuerza física (amplitud). Los valores suelen oscilar entre -60 y 0 db.",
  // },
  {
    title: "Speechiness (Hablado):",
    text: "Detecta la presencia de palabras habladas en una pista. Cuanto más exclusivamente hablada sea la grabación (p. ej., programa de entrevistas, audiolibro, poesía), más cercano a 1,0 será el valor del atributo. Los valores superiores a 0,66 describen pistas que probablemente estén compuestas exclusivamente de palabras habladas. Los valores entre 0,33 y 0,66 describen pistas que pueden contener música y voz, ya sea en secciones o en capas, incluidos casos como la música rap. Los valores inferiores a 0,33 probablemente representen música y otras pistas que no sean de voz.",
  },
  {
    title: "Acousticness (Acústico):",
    text: "Una medida de confianza de 0,0 a 1,0 sobre si la pista es acústica. 1.0 representa una alta confianza en que la pista es acústica.",
  },
  {
    title: "Instrumentalness (Instrumental):",
    text: `Predice si una pista no contiene voces. Los sonidos "Ooh" y "aah" se tratan como instrumentales en este contexto. Las pistas de rap o de palabra hablada son claramente "vocales". Cuanto más cerca esté el valor de instrumentalidad de 1,0, mayor será la probabilidad de que la pista no contenga contenido vocal. Los valores superiores a 0,5 pretenden representar pistas instrumentales, pero la confianza es mayor a medida que el valor se acerca a 1,0.`,
  },
  {
    title: "Liveness (En Vivo):",
    text: "Detecta la presencia de una audiencia en la grabación. Los valores más altos representan una mayor probabilidad de que la pista se haya interpretado en vivo. Un valor superior a 0,8 proporciona una gran probabilidad de que la pista esté en vivo.",
  },
  {
    title: "Valence (Positividad):",
    text: "Una medida de 0,0 a 1,0 que describe la positividad musical que transmite una pista. Las pistas con valencia alta suenan más positivas (p. ej., felices, alegres, eufóricas), mientras que las pistas con valencia baja suenan más negativas (p. ej., tristes, deprimidas, enojadas).",
  },
];
