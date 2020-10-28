import React, { useEffect, useState } from 'react';
import { Form, Input, Grid, Card, Statistic , Button} from 'semantic-ui-react';

import { useSubstrate } from './substrate-lib';
import { TxButton } from './substrate-lib/components';

function Main (props) {
  const { api } = useSubstrate();
  const { accountPair } = props;

  // The transaction submission status
  const [status, setStatus] = useState('');

  // The currently stored value
  const [currentTeam, setCurrentTeam] = useState("");
  const [formTeam, setFormTeam] = useState("");
  const [currentMembers, setCurrentMembers] = useState(0);
  const [formMembers, setFormMembers] = useState(0);
  const [currentAgree, setCurrentAgree] = useState(false);
  const [formAgree, setFormAgree] = useState(false);

  useEffect(() => {
    let unsubscribe;
    api.query.templateModule.user(newValue => {
      if (newValue.isNone) {
        setCurrentTeam('<None>')
        setCurrentMembers(0)
        setCurrentAgree(false)
      } else {
        console.log(newValue)
        setCurrentTeam(newValue.Team.toHuman())
        setCurrentMembers(newValue.Members.toString())
        setCurrentAgree(newValue.Agree)
      }
    }).then(unsub => {
      unsubscribe = unsub;
    })
      .catch(console.error);

    return () => unsubscribe && unsubscribe();
  }, [api.query.templateModule]);

  return (
    <Grid.Column width={8}>
      <h1>UserStruct</h1>
      <Card centered>
      <Card.Content textAlign='center'>
        <Card.Header content={`name: ${currentTeam}`} />
          <Statistic
            label='Members'
            value={currentMembers}
          />
        </Card.Content>
      <Card.Content extra>Agree? {currentAgree.toString()}</Card.Content>
      </Card>
      <Form>
      <Form.Field>
          <Input
            label='Team Name'
            state='Team'
            type='string'
            onChange={(_, { value }) => setFormTeam(value)}
          />
        </Form.Field>
        <Form.Field>
          <Input
            label='Members'
            state='Members'
            type='number'
            onChange={(_, { value }) => setFormMembers(value)}
          />
        </Form.Field>
        <Form.Field>
          <Input
            label='Agree to Terms'
            state='newValue'
            type='checkbox'
            onChange={(e) => setFormAgree(e.target.checked)}
          />
        </Form.Field>
        <Form.Field style={{ textAlign: 'center' }}>
          <TxButton
            accountPair={accountPair}
            label='Save'
            type='SIGNED-TX'
            setStatus={setStatus}
            attrs={{
              palletRpc: 'templateModule',
              callable: 'doUser',
              inputParams: [{ "Team": formTeam,"Members":formMembers, "Agree":formAgree }],
              paramFields: [true]
            }}
          />
        </Form.Field>
        <div style={{ overflowWrap: 'break-word' }}>{status}</div>
      </Form>
    </Grid.Column>
  );
}

export default function UserStruct (props) {
  const { api } = useSubstrate();
  return (api.query.templateModule && api.query.templateModule.user
    ? <Main {...props} /> : null);
}