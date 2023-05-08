import { ArticleTitle } from "../../components/forms";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { Loader,colors,fonts } from "../../utils/styles";

import styled from "styled-components";

/* ---------------------------------- STYLE --------------------------------- */

const DivPageDetailsScenario = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    min-height: 80.5vh;
    margin: 1rem auto;
`;

const DivDetailsScenario = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    width: 80%;
    margin: 1rem auto;
    padding: 1rem;
`;

const H1Scenario = styled.h1`
    font-size: 2rem;
    font-family: ${fonts.titre};
    color: ${colors.bleuFonce};

    &:after {
        content: "";
        display: block;
        width: 100%;
        height: 0.2rem;
        background-color: ${colors.jauneFonce};
    }
`;

const H2Scenario = styled.h2`
    font-size: 1.5rem;
    font-family: ${fonts.titre};
    color: ${colors.bleuFonce};
`;

function DetailsScenario(){
    const id = useParams().id;
    const [scenario, setScenario] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:8000/api/scenarios/${id}/detaille`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            setScenario(data);
            setLoading(false);
        })
        .catch((error) => {
            console.log(error);
            setLoading(false);
        });
    }, []);

console.log(scenario);

    return(
        <DivPageDetailsScenario>
            <ArticleTitle texte="Détails du scénario" />
            {loading || scenario.id === undefined ? (
                <Loader />
            ) : (
                <DivDetailsScenario>
                    <H1Scenario>Département : {scenario.departement.nom}</H1Scenario>
                    <H2Scenario>Annee : {scenario.annee}</H2Scenario>
                    <p>Date de création : {scenario.created_at}</p>
                    <p>Dernière modification : {scenario.updated_at}</p>
                    <H2Scenario>Propriétaire : {scenario.proprietaire.nom}</H2Scenario>
                </DivDetailsScenario>
            )}
        </DivPageDetailsScenario>
    )
}

export default DetailsScenario;