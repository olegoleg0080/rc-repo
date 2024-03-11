import { DelBtn, Item, Level, Text, Title } from "./form.styled";

export const Card = ({ id, title, level, description, onDeleteBtn }) => {
    return (
        <Item level={level}>
            <Title>{title}</Title>
            <Text>{description}</Text>
            <Level>{level}</Level>
            {/* <Gmail colorData="#ff0000"/> */}
            <DelBtn onClick={() => onDeleteBtn(id)}>delete</DelBtn>
        </Item>
    );
};
