import styled from "styled-components";


export const Loading = styled.div`
    display: flex;
    color: #fff;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

export const Container = styled.div`
    max-width: 700px;
    background: #fff;
    border-radius: 4px;
    box-shadow: 0 0 20px (0, 0, 0, 0.2);
    padding: 0 30px;
    margin: 80px auto;
`;

export const Owner = styled.header`
    display: flex;
    flex-direction: column;
    align-items: center;

    img{
        width: 150px;
        border-radius: 20%;
        margin: 20px 0;

    }

    h1{
        font-size: 30px;
        color: #0D2636;

    }

    p{
        margin-top: 10px;
        font-size: 14px;
        color: #000;
        text-align: center;
        line-height: 1.4;
        max-width: 400px;
    }


`;

export const BackButton = styled.button`
    margin-top: 30px;
    background: transparent;
    border: none;

`;

export const IssuesList = styled.ul`
    margin-top: 30px;
    padding-top:30px ;
    border-top: 2px solid #000;
    list-style: none;


    li{
        display: flex;
        padding: 15px 10px;

        & + li {
            margin-top: 10px;
        }
    }
    img {
        width: 50px;
        height: 36px;
        border-radius: 50%;
        border: 2px solid #0D2636;
    }

    div{
        flex: 1;
        margin-left: 12px;

        p{
            margin-top: 10px;
            font-size: 15px;
            color: #000;
            margin-left: 5px;
        }
    }

    strong {
        font-size: 15px;

        a{
            text-decoration: none;
            color: #222;
            transform: 0.3s;

            :hover{
                color: #ff00ff;
            }
        }

        span{
            background: #222;
            color: #fff;
            border-radius: 4px;
            font-size: 12px;
            font-weight: 600;
            padding: 4px 7px;
            margin-left: 10px;
        }
      
    }

`;

export const PagesActions = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    button{
        outline: 0;
        border: 0;
        background: #222;
        color: #fff;
        padding: 5px 10px;
        margin-bottom: 15px;
        border-radius: 4px;
    }
`;

