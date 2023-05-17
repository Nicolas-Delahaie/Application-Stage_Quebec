import { ArticleTitle } from "../../components/forms";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { Loader, colors, fonts } from "../../utils/styles";

import styled from "styled-components";
import { useContext } from "react";
import { AppContext } from "../../utils/context/context";


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

const DivTableau = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    overflow: auto;

    ::-webkit-scrollbar {
        height: 0.5rem;
    }

    ::-webkit-scrollbar-track {
        background-color: transparent;
    }

    ::-webkit-scrollbar-thumb {
        background-color: ${colors.jauneFonce};
        border-radius: 1rem;
    }
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

const TableScenario = styled.table`
    margin: 1rem auto;
    border-collapse: collapse;
    border: 1px solid ${colors.bleuFonce};

    overflow-x: scroll;
`;

const ThScenario = styled.th`
    font-size: 0.9rem;
    font-family: ${fonts.titre};
    color: ${colors.bleuFonce};
    padding: 0.5rem;
    background-color: ${colors.jauneFonce};
    border: 1px solid ${colors.bleuFonce};

    &:nth-child(n+5) {
        text-orientation: mixed;
        writing-mode: vertical-rl;
        transform: rotate(180deg);
        width: 2rem;
    }
`;

const TrScenario = styled.tr`
    font-size: 0.9rem;
    font-family: ${fonts.texte};
    border-collapse: collapse;
    border: 1px solid ${colors.bleuFonce};
    /*&:nth-child(even) {
        background-color: ${colors.gris};
    }
    &:nth-child(odd) {
        background-color: ${colors.grisClair};
    }*/
    &:hover {
        background-color: ${colors.jauneTresClair};
    }
`;

const TdScenario = styled.td`
    font-size: 0.9rem;
    padding: 0.25rem;
    font-family: ${fonts.texte};
    boder-collapse: collapse;
    border: 1px solid ${colors.bleuFonce};
    text-align: center;
    &:nth-child(-n+4) {
        font-family: ${fonts.titre};
        background-color: ${colors.grisClair};
    }
    &:hover {
        background-color: ${colors.jauneClair};
    }
`;

const TrTitreScenario = styled(TrScenario)`
    font-family: ${fonts.titre};
    font-size: 1rem;
    background-color: ${colors.gris};
`;

/* ----------------------------------- DOM ---------------------------------- */

function DetailsScenario() {
    const id = useParams().id;
    const [scenario, setScenario] = useState({});
    const [modification, setModification] = useState({});
    const [scenarioRepartition, setscenarioRepartition] = useState({});
    const [loading, setLoading] = useState(false);
    const { getToken } = useContext(AppContext);

    var liberations = [];
    var professeurs = [];

    /**
     * 
     * @param {*} liberation liberation à ajouter au tableau
     * @returns un tableau avec les libérations
     */
    const addLiberation = (liberation) => {
        if (!liberations.includes(liberation)) {
            liberations.push(liberation);
        }
    }

    const addProfesseur = (professeur) => {
        if (!professeurs.includes(professeur)) {
            professeurs.push(professeur);
        }
    }

    /**
     * Récupération des données détaillées du scénario
     */
    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:8000/api/scenarios/${id}/detaille`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + getToken().slice(1, -1),

            }
        })
            .then((response) => {
                return response.json();
            })
            .then((scenarioRepartition) => {
                setScenario(scenarioRepartition);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:8000/api/scenarios/${id}/modifications`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + getToken().slice(1, -1),

            }
        })
            .then((response) => {
                return response.json();
            })
            .then((scenarioRepartition) => {
                setModification(scenarioRepartition);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:8000/api/scenarios/${id}/repartition`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + getToken().slice(1, -1),
            }
        })
            .then((response) => {
                return response.json();
            })
            .then((scenarioRepartition) => {
                setscenarioRepartition(scenarioRepartition);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    return (
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
                    <H1Scenario>Historique des modifications</H1Scenario>
                    {
                        modification[0] === undefined ? (
                            <p>Aucune modification n'a été apportée</p>
                        ) : (
                            <div>
                                {
                                    modification.map((modif) => (
                                        <div key={modif.id}>
                                            <p>Date de dernière modification : {modif.date_modif}</p>
                                            <p>Utilisateur aillant fait la modification : {modif.utilisateur_name}</p>
                                        </div>
                                    ))
                                }
                            </div>
                        )
                    }
                    <H1Scenario>Le scénario </H1Scenario>
                    <H2Scenario>Répartition des cours</H2Scenario>
                    <DivTableau>
                        <TableScenario>
                            <thead>
                                <TrScenario>
                                    <ThScenario>Titre du cours</ThScenario>
                                    <ThScenario>Pondération</ThScenario>
                                    <ThScenario>Nombre d'élèves</ThScenario>
                                    <ThScenario>Nombre de groupes</ThScenario>
                                    {
                                        scenarioRepartition.aEteValide === undefined ? (
                                            <ThScenario></ThScenario>
                                        ) : (
                                            scenarioRepartition.departement.repartition.map((cours) => (
                                                cours.enseignants.map((enseignant) => (
                                                    addProfesseur(enseignant),
                                                    <ThScenario key={enseignant.id}>{enseignant.nom_enseignant}</ThScenario>
                                                ))
                                            ))
                                        )
                                    }
                                </TrScenario>
                            </thead>
                            <tbody>
                                {
                                    scenarioRepartition.aEteValide === undefined ? (
                                        <TrScenario>
                                            <TdScenario>Le scénario n'a pas été chargée</TdScenario>
                                        </TrScenario>
                                    ) : (
                                        scenarioRepartition.departement.repartition.map((cours) => (
                                            <TrScenario key={cours.id_cours}>
                                                <TdScenario>{cours.nom_cours}</TdScenario>
                                                <TdScenario>{cours.pivot.ponderation}</TdScenario>
                                                <TdScenario>{cours.pivot.tailleGroupes}</TdScenario>
                                                <TdScenario>{cours.pivot.nbGroupes}</TdScenario>
                                                {
                                                    professeurs.map((enseignant) => (
                                                        <TdScenario key={enseignant.id}></TdScenario>
                                                    ))
                                                }
                                            </TrScenario>
                                        ))
                                    )
                                }
                                <TrTitreScenario>
                                    <TdScenario></TdScenario>
                                    <TdScenario></TdScenario>
                                    <TdScenario>Libération / Conge</TdScenario>
                                    <TdScenario>ETC</TdScenario>
                                </TrTitreScenario>

                                {
                                    scenarioRepartition.aEteValide === undefined ? (
                                        <TrScenario>
                                            <TdScenario>Le scénario n'a pas été chargé</TdScenario>
                                        </TrScenario>
                                    ) : (
                                        <>
                                            {
                                            scenarioRepartition.departement.repartition.map((cours) =>
                                                cours.enseignants.map((enseignant) => (
                                                    enseignant.liberations.map((liberation) => (
                                                        addLiberation(liberation)
                                                    ))
                                                ))
                                            )}

                                            {liberations.map((liberation) => (
                                                <TrScenario key={liberation.id}>
                                                    <TdScenario></TdScenario>
                                                    <TdScenario></TdScenario>
                                                    <TdScenario>{liberation.motif}</TdScenario>
                                                    <TdScenario>{liberation.pivot.tempsAloue}</TdScenario>
                                                    {professeurs.map((professeur) => (
                                                        professeur.id_enseignant === liberation.pivot.utilisateur_id ? (
                                                            <TdScenario key={professeur.id}>{liberation.pivot.tempsAloue}</TdScenario>
                                                        ) : (
                                                            <TdScenario key={professeur.id}></TdScenario>
                                                        )
                                                    ))}
                                                </TrScenario>
                                            ))}
                                        </>
                                    )
                                }

                                <TrScenario>
                                    <TdScenario></TdScenario>
                                    <TdScenario></TdScenario>
                                    <TdScenario></TdScenario>
                                    <TdScenario>Calcul de CI</TdScenario>
                                    {professeurs.map((professeur) => (
                                        <TdScenario key={professeur.id}></TdScenario>
                                    ))}
                                </TrScenario>

                            </tbody>
                        </TableScenario>
                    </DivTableau>

                </DivDetailsScenario>
            )}
        </DivPageDetailsScenario>
    )
}

export default DetailsScenario;