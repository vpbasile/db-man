import { ArrowForwardIcon } from "@chakra-ui/icons";
import { List, Heading, ListItem, Link, ListIcon, list } from "@chakra-ui/react";

export default function TodoList(props: { list: JSX.Element[] }) {

  const listBullet = <ListIcon as={ArrowForwardIcon} color='green.500' />;
  const todo = props.list

  let i = 0;

  return (<List spacing={3} p={3}>
    <Heading as={'h3'}>Future Enhancements</Heading>
    {todo.map(eachItem => <ListItem key={i++}>{listBullet}{eachItem}</ListItem>)}
  </List>)
}