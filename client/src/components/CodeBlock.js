import React, { Component } from "react";

export default class CodeBlock extends Component {
    render() {
        return (
            <div className="w-50 mx-auto">
                <h3>Code:</h3>
                <pre
                    style={{ tabSize: 4 }}
                    className="p-3 bg-dark text-light rounded"
                >
                    <code>
                        {`function numberAdd(str) \n\tconst nums = str.match(/\d+/g);\n\treturn nums.reduce((accum, value, index) => accum + parseInt(value), 0);\n}`}
                    </code>
                </pre>
            </div>
        );
    }
}
