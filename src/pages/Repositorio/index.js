import { Container, Owner, Loading, BackButton, IssuesList,  PagesActions } from "./style";
import {FaArrowLeft} from 'react-icons/fa'
import {useState, useEffect} from 'react'
import { Link } from "react-router-dom";
import api from "../../services/api";


export default function Repositorio({match}){

    const [repositorio, setRepositorio] = useState({})
    const [issues, setIssues] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    useEffect(()=>{
        async function load(){
            const nomeRepo = decodeURIComponent(match.params.repositorio)
            const [repositorioData, issuesData] = await Promise.all([
                    api.get(`/repos/${nomeRepo}`),
                    api.get(`/repos/${nomeRepo}/issues`, {
                        params:{
                            state: 'open',
                            per_page: 5
                        }  
                    })
                ])
                setRepositorio(repositorioData.data)
                setIssues(issuesData.data)
                setLoading(false)
        }
        load()
    },[match.params.repositorio])

    useEffect(()=>{
        async function loadIssue(){

            const nomeRepo = decodeURIComponent(match.params.repositorio)
            const response = await api.get(`/repos/${nomeRepo}/issues/`, {
                params:{
                    state: 'open',
                    page,
                    per_page: 5
                }
            })
            setIssues(response.data)
        }
        loadIssue()
    }, [match.params.repositorio, page])

    function handlePage(action){
         setPage(action === 'back' ? page -1 : page + 1) 
        //alert('FOI')
    }

    if(loading){
        return(
            <Loading>
                <h1>Carregando...</h1>
            </Loading>
        )
    }

    return(
       <Container>
        <BackButton>
            <Link to="/">
            <FaArrowLeft 
            color="#0D2636"
            size={30}
            />
            </Link>
        </BackButton>
        <Owner>
            <img 
            src={repositorio.owner.avatar_url} 
            alt={repositorio.owner.login} 
            />
            <h1>{ repositorio.name }</h1>
            <p>{ repositorio.description }</p>
        </Owner>

        <IssuesList>
            {issues.map(issues=>(
                <li key={String(issues.id)}>
                    <img src={issues.user.avatar_url} alt={issues.user.login}/>
                    <div>
                        <strong>
                            
                            <a href={issues.html_url}>{issues.title}</a>
                            {issues.labels.map(label =>(
                                <span key={String(label.id)}>
                                    {label.name}
                                </span>
                            ))}
                            
                        </strong>
                        <p>
                          
                        {issues.user.login}
                        </p>
                    </div>
                </li>
            ))}
        </IssuesList>
        <PagesActions>
            <button type="button" onClick={()=> handlePage('back')} >
                Voltar
            </button>
            
            <button type="button" onClick={()=> handlePage('next')} >    
            Proximo
            </button>
        </PagesActions>

       </Container>
    )
}