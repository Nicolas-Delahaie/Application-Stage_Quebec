import styled from 'styled-components';
import { colors, fonts } from '../../utils/styles';
import { useState, useRef, useEffect } from 'react';
import { AppContext } from '../../utils/context/context';
import { useContext } from 'react';
import { Toaster, toast } from 'react-hot-toast';

export const TdScenario = styled.td`
    font-size: 0.9rem;
    max-width: 5rem;
    height: 2rem;
    overflow : scroll;
    boder-collapse: collapse;
    border: 1px solid ${colors.bleuFonce};
    text-align: center;
    &:nth-child(-n+5) {
        font-family: ${fonts.titre};
        background-color: ${colors.grisClair};
    }
    &:hover {
        background-color: ${colors.jauneClair};
    }

    ::-webkit-scrollbar {
        display: none;
    }
`;

const InputTdScenario = styled.input`
    font-size: 0.9rem;
    width: 100%;
    height: 100%;
    border: none;
    color: ${colors.bleuFonce};
    font-family: ${fonts.texte};

    ::-webkit-inner-spin-button,
    ::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    :focus {
        outline: none;
    }
`;


export function TdScenarioComponent({ indexCours, indexProfesseur, nbGroupes, TbCours, TbProfesseurs, TbRepartition, fonctionUpdateRepartition }) {
    const [estClicker, setEstClicker] = useState(false);
    const [resultatUpdate, setResultatUpdate] = useState(0);
    const inputRef = useRef(null);
    const { apiAccess } = useContext(AppContext);

    const findRepartition = (indexCours, indexProfesseur, TbCours, TbProfesseurs, TbRepartition) => {
        var repartitionFind = TbRepartition.find(
            (rep) =>
                rep.idCours === TbCours[indexCours].id && rep.idProfesseur === TbProfesseurs[indexProfesseur].id,
        )
        if (repartitionFind === undefined) {
            toast.error("Erreur : Impossible de modifié un cours non attribué");
        }
        else {
            return repartitionFind;
        }
    }

    const clickTest = () => {
        setEstClicker(!estClicker);
    };

    const updateRepartitionInArray = (resultatUpdate, TbRepartition) => {
        const updatedArray = TbRepartition.map((repartition) => {
            if (repartition.id === resultatUpdate.id) {
                return resultatUpdate;
            }
            return repartition;
        });

        return updatedArray;
    };

    const entreTest = (e, nbGroupes) => {
        if (e.key === 'Enter') {
            const repartitionMatch = findRepartition(indexCours, indexProfesseur, TbCours, TbProfesseurs, TbRepartition);
            const value = Number(e.target.value);
            setEstClicker(!estClicker);
            if (value > 0 && value !== nbGroupes) {
                updateRepartition(repartitionMatch.id, value);
                const resultatUpdate = {
                    ...repartitionMatch,
                    nbGroupes: value,
                };

                console.log('TbRepartition avant la fonction');
                console.log(TbRepartition);
                const updatedArray = updateRepartitionInArray(resultatUpdate, TbRepartition);
                console.log('TbRepartition après la fonction');
                console.log(updatedArray);
                fonctionUpdateRepartition(updatedArray);
            }
        }
    };

    const updateRepartition = async (idRepartition, nouveauNbGroupes) => {
        try {
            toast.loading('Enregistrement...');
            const rep = await apiAccess({
                url: `http://localhost:8000/api/repartition/${idRepartition}?nbGroupes=${nouveauNbGroupes}`,
                method: 'POST',
            });
            toast.dismiss();

            if (rep.success) {
                setResultatUpdate(rep.datas);
                toast.success('Modification enregistrée');
            } else {
                toast.error("Erreur : " + rep.erreur);
            }
        } catch (error) {
            toast.error("Une erreur est survenue : " + error.message);
        }
    };

    useEffect(() => {
        if (estClicker && inputRef.current) {
            inputRef.current.focus();
        }
    }, [estClicker]);


    return (
        estClicker ? (
            <TdScenario onClick={clickTest}>
                <Toaster />
                <InputTdScenario ref={inputRef} type="number" placeholder={nbGroupes} onKeyDown={(e) => entreTest(e, nbGroupes)} />
            </TdScenario>
        ) : (
            <TdScenario onClick={clickTest}>
                {nbGroupes}
            </TdScenario>
        )
    );
}
