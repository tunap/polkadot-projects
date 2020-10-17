import React, { useEffect, useState } from 'react';
import { Table, Grid, Loader, Dimmer } from 'semantic-ui-react';
import { useSubstrate } from './substrate-lib';
import useBlocknumber from './hooks/useBlockNumber';

export default function BlockInformation() {
  const [header, setHeader] = useState(undefined);
  const { api } = useSubstrate();
  const [blockNumber] = useBlocknumber();

  useEffect(() => {
    if (!blockNumber) { return; }

    api.rpc.chain.getBlock()
      .then(response => {
        setHeader(response['block']['header']);
      })
      .catch((er) => { console.log(er); });
  }, [api, blockNumber, setHeader]);

  if (header == null || !blockNumber) {
    return (
      <Grid.Column>
        <Dimmer active inverted>
          <Loader size='medium' active inverted inline='centered'>Loading information...</Loader>
        </Dimmer>
      </Grid.Column>);
  }

  return (
    <Grid.Column>
      <h1>Block information</h1>
      <Table celled striped size='small' color='violet' key='violet'>
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
                {header && header['hash'].toString()}
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
      </Table>
    </Grid.Column>
  );
}
