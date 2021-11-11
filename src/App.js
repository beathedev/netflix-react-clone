import React, { useEffect, useState } from 'react';
import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow'
import FeaturedMovie from './components/FeaturedMovie';
import Header from './components/Header';
import './App.css'
    const App = () => {
        const [movieList, setMovieList ] = useState([]);
        const [featuredData, setFeaturedData] = useState(null);
        const [blackHeader, setBlackHeader] = useState(false);
        useEffect(() => {

            const loadAll = async() => {
            //Pegando a lista total.
            let list = await Tmdb.getHomeList();
            setMovieList(list);

            //Pegando o Featured.
            let originals = list.filter(i=>i.slug === 'originals');
            let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
            let chosen = originals[0].items.results[randomChosen];
            let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
            setFeaturedData(chosenInfo);
            }
            loadAll();

        }, []);

        useEffect(()=>{
            const scrollListener = () => {
              if(window.scrollY > 10) {
                setBlackHeader(true);
              } else {
                setBlackHeader(false);
              }
            }
        
            window.addEventListener('scroll', scrollListener);
            return () => {
              window.removeEventListener('scroll', scrollListener);
            }
          }, []);
        
        return (
            <div className="page">
                <Header black={blackHeader} />
                {featuredData &&
                <FeaturedMovie item={featuredData}/>
                }

                <section className="lists">
                {movieList.map((item, key)=>(
                <MovieRow key={key} title={item.title} items={item.items} />  
                    ))}
                </section>
                <footer>
                    Criado com  <span role="img" aria-label="coração">❤️</span> por Beatriz Francisconi<br/>
                    Direitos de imagem para Netflix (Material de estudo e demonstração de  habilidades apenas)<br/>
                    Dados e imagens da API do site Themoviedb.org
                </footer>
                {movieList.length <= 0 &&
               
                 <div className="loading">
                  <img src="https://c.tenor.com/zQ6H2k7HwGcAAAAM/netflix-netflix-logo.gif" alt="Carregando"></img>
                </div>
                }

            </div>
        )
}

export default  App;