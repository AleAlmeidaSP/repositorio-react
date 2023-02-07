import { Container, SubmitButtom, Form, List, DeleteButton } from "./style";
import { FaGithub, FaPlus, FaSpinner, FaBars, FaTrash } from 'react-icons/fa';
import { useState, useCallback, useEffect} from 'react'
import api from '../../services/api'
import { Link } from "react-router-dom";
 
export default function Main(){
    const [newRepo, setNewRepo ] = useState('')
    const [repositorio, setRepositorio] = useState([])
    const [loading, setLoading] = useState(false)
    const [alert, setAlert] = useState(null)

    //Buscar
    useEffect(()=>{
       const repoStore = localStorage.getItem('repos')
        if(repoStore){
            setRepositorio(JSON.parse(repoStore))
        }
    },[])

    //Salvar Alterações
    useEffect(()=>{
        localStorage.setItem('repos', JSON.stringify(repositorio))
    },[repositorio])

    const handSubmit = useCallback((e)=>{
        e.preventDefault();
        async function submit(){
            setLoading(true)
            setAlert(null)
        try{

            if(newRepo === ''){
                throw new Error('Você precisa indicar um repositório')
            }

            const response = await api.get(`repos/${newRepo}`)

            const hasRepo = repositorio.find(repo => repo.name === newRepo)
                if(hasRepo){
                    throw new Error('Repositorio duplicado')
                }

            const data = {
                name: response.data.full_name

            }
            setRepositorio([...repositorio, data])
            setNewRepo('')
        }catch(error){
            setAlert(true)
            console.log(error)  
        }finally{
             setLoading(false)
        }
         
        }  
        submit()
    },[newRepo, repositorio])
        
    function handInputChange(e){
        setNewRepo(e.target.value) 
        setAlert(null)
        
    }

    const handleDelete = useCallback((repo)=>{
        const find = repositorio.filter(r => r.name !== repo)
        setRepositorio(find)

    },[repositorio])
    return(
        <div>
            <Container>
                <h1>
                    <FaGithub size={25 }/> 
                    Meus Repositorios
                </h1>
                <Form onSubmit={handSubmit} error={alert}> 
                <input 
                type="text" 
                placeholder="Adicionar Repositório" 
                value={ newRepo }
                onChange={handInputChange}
                            />
                    <SubmitButtom loading={loading ? 1 : 0}>
                        {loading ? (
                            <FaSpinner color="#fff" size={14} />
                        ) : (
                            <FaPlus color="#FFF" size={14} />
                        )

                        } 
                    </SubmitButtom>
                </Form>

                <List>
                        { repositorio.map(repo => (
                            <li key={repo.name}>
                                <span>
                                    <DeleteButton onClick={()=>handleDelete(repo.name)}>
                                        <FaTrash size={14}/>
                                    </DeleteButton>   
                                    { repo.name }
                                </span>
                                <Link to={`/repositorio/${encodeURIComponent( repo.name )}`}>
                                    <FaBars size={20} />
                                </Link>
                            </li>
                        )) }
                </List>

            </Container>
        </div>
    )
}