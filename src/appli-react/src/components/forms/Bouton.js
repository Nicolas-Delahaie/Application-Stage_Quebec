import styled from "styled-components";
import { colors, fonts } from "../../utils/styles";

export const BoutonStyle = styled.button`
    background-color: ${colors.jauneFonce};
    color: ${colors.bleuFonce};
    text-decoration: none;
    font-family: ${fonts.titre};
    font-weight: bold;
    padding: 0.5rem 1rem;
    border-radius: 1rem;
    margin: 1rem;
`;

function Bouton({ onClick, children }) {
    return <BoutonStyle onClick={onClick}>{children}</BoutonStyle>;
}

export default Bouton;