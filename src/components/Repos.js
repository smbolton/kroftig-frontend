// Kroftig frontend src/components/Repos.js
//
// Copyright © 2017 Sean Bolton.
//
// Permission is hereby granted, free of charge, to any person obtaining
// a copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to
// permit persons to whom the Software is furnished to do so, subject to
// the following conditions:
//
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  QueryRenderer,
  graphql
} from 'react-relay';
import { Table } from 'react-bootstrap';

import environment from '../Environment';

const ReposQuery = graphql`
  query ReposQuery {
    repos {
      name
      description
      path
    }
  }
`;

class Repos extends Component {

  render() {
    return (
      <QueryRenderer
        environment={environment}
        query={ReposQuery}
        render={({error, props}) => {
          if (error) {
            return <div>{error.message}</div>;
          } else if (props) {
            return (
              <Table condensed style={{width: 'auto'}}>
                <thead><tr><th colSpan={2}>Repositories:</th></tr></thead>
                <tbody>
                  {props.repos.map((repo) =>
                    <tr key={repo.name}>
                      <td><Link to={'/browse/' + repo.name}>{repo.name}</Link></td>
                      <td>
                        <div>{repo.description}</div>
                        <div>{repo.path}</div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            );
          }
          return <div>Loading...</div>;
        }}
      />
    );
  }

}

export default Repos;
