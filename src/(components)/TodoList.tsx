import { ArrowForwardIcon } from "@chakra-ui/icons";
import { List, Heading, ListItem, Link, ListIcon } from "@chakra-ui/react";

export default function TodoList() {

  const listBullet = <ListIcon as={ArrowForwardIcon} color='green.500' />;
  const todo: JSX.Element[] = [
    <>Get things working with the dropdown menus</>,
    <>Implement <Link href="https://chakra-ui.com/docs/components/form-control">form control</Link></>,
    <>Work with GPT to call the create route</>,
    <>Find the FIXME tag</>,
    <>Figure out why I can't edit the last row.  Must be an off-by-one error</>,
    <>Get the select lists to choose the right value when first rendered</>,
  ]

  let i = 0;

  return (<List spacing={3} p={3}>
    <Heading as={'h3'}>Future Enhancements</Heading>
    {todo.map(eachItem => <ListItem key={i++}>{listBullet}{eachItem}</ListItem>)}
  </List>)
}