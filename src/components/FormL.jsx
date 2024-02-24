import data from "../db.json";
import { Item, Level, List, Text, Title } from "./form.styled";
export const ListToDo = () => {
    return (
        <List>
            {data.map(({ title, description, level, id, status}) => (
                <Item status={status} level={level} key={id}>
                    <Title>{title}</Title>
                    <Text>{description}</Text>
                    <Level>{level}</Level>
                </Item>
            ))}
        </List>
    );
};
