import React, { useEffect, useState } from 'react';
import { Table, Grid, Input, Icon } from 'semantic-ui-react';
import { useSubstrate } from './substrate-lib';


export default function SearchBlock() {
  const [query, setQuery] = useState('');

  const [header, setHeader] = useState(undefined);
  const { api } = useSubstrate();

  useEffect(() => {
    if (query == null) { return; }

    api.rpc.chain.getBlock(query)
      .then(response => {

        setHeader(response['block']['header']);

      })
      .catch((er) => { console.log(er); });
  }, [api, query, setHeader]);


  return (
    <Grid.Column>
      <div>
        <h1>Search block</h1>
        <Input icon={<Icon name='search' inverted circular link />} value={query} onChange={(e) => setQuery(e.target.value)} iconPosition='left' placeholder='Search...' />
      </div>
      {header && <Table celled striped size='small' color='orange' key='orange'>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              Header
            </Table.HeaderCell>
            <Table.HeaderCell>
              Information
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell width={3} textAlign='right'>Block number</Table.Cell>
            <Table.Cell width={10}>
              <span style={{ display: 'inline-block', minWidth: '31em' }}>
                {header['number'].toNumber()}
              </span>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell width={3} textAlign='right'>Hash</Table.Cell>
            <Table.Cell width={13}>
              <span style={{ display: 'inline-block', minWidth: '31em' }}>
                {header['hash'].toString()}
              </span>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell width={3} textAlign='right'>State root</Table.Cell>
            <Table.Cell width={13}>
              <span style={{ display: 'inline-block', minWidth: '31em' }}>
                {header['stateRoot'].toString()}
              </span>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell width={3} textAlign='right'>Parent root</Table.Cell>
            <Table.Cell width={13}>
              <span style={{ display: 'inline-block', minWidth: '31em' }}>
                {header['parentHash'].toString()}
              </span>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell width={3} textAlign='right'>Extrinsics root</Table.Cell>
            <Table.Cell width={13}>
              <span style={{ display: 'inline-block', minWidth: '31em' }}>
                {header['extrinsicsRoot'].toString()}
              </span>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>}
    </Grid.Column>
  );
}
