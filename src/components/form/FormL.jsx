// import { Gmail } from "icons/Gmail";
import { Card } from "./List";
import { List } from "./form.styled";

export const ListToDo = ({ list, onDelete }) => {
    return (
        <List>
            {list.map((item) => (
                <Card
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    level={item.level}
                    status={item.status}
                    description={item.description}
                    onDeleteBtn={onDelete}
                />
            ))}
        </List>
    );
};
