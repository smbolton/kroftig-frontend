// Kroftig frontend src/components/LogCommit.js
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
import {
  createFragmentContainer,
  graphql
} from 'react-relay';
import { Link } from 'react-router-dom';

class LogCommit extends Component {

  render() {
    let author = this.props.commit.author;
    let committer = this.props.commit.committer;
    if (author !== committer) {
      author += ' (c: ' + committer + ')';
    }
    return (
      <tr>
        <td><Link to={`/browse/${this.props.repo}/commit/${this.props.commit.oid}`}>
          <samp>{this.props.commit.oid.slice(0,7)}</samp>
        </Link></td>
        <td>{this.props.commit.message}</td>
        <td>{author}</td>
        <td>{this.props.commit.authorTime}</td>
      </tr>
    );
  }

}

export default createFragmentContainer(LogCommit, graphql`
  fragment LogCommit_commit on Commit {
    oid
    message
    author
    committer
    authorTime
  }
`);
