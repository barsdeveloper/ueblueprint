import Configuration from "../js/Configuration.js"
import { testNode } from "./fixtures/test.js"

testNode({
    name: "Emitter.Determinism",
    value: String.raw`
        Begin Object Class=/Script/NiagaraEditor.NiagaraClipboardContent Name="NiagaraClipboardContent_10" ExportPath="/Script/NiagaraEditor.NiagaraClipboardContent'/Engine/Transient.NiagaraClipboardContent_10'"
            ExportedNodes="QmVnaW4gT2JqZWN0IENsYXNzPS9TY3JpcHQvTmlhZ2FyYUVkaXRvci5OaWFnYXJhTm9kZUlucHV0IE5hbWU9Ik5pYWdhcmFOb2RlSW5wdXRfNDYiIEV4cG9ydFBhdGg9Ii9TY3JpcHQvTmlhZ2FyYUVkaXRvci5OaWFnYXJhTm9kZUlucHV0Jy9FbmdpbmUvVHJhbnNpZW50Lk5ld05pYWdhcmFTY3JpcHQ6TmlhZ2FyYVNjcmlwdFNvdXJjZV8wLk5pYWdhcmFHcmFwaF8wLk5pYWdhcmFOb2RlSW5wdXRfNDYnIgogICBJbnB1dD0oTmFtZT0iRW1pdHRlci5EZXRlcm1pbmlzbSIsVHlwZURlZkhhbmRsZT0oUmVnaXN0ZXJlZFR5cGVJbmRleD04MikpDQogICBVc2FnZT1TeXN0ZW1Db25zdGFudA0KICAgQ2hhbmdlSWQ9MjY3NDNBNzU3MDVENDdGMDlENENBMzlCOEM3N0Y2NDUNCiAgIE5vZGVQb3NYPTIwOA0KICAgTm9kZVBvc1k9LTQzMg0KICAgTm9kZUd1aWQ9M0YzMkJDMjEyMUNCNDZERDk4NEJGNzIzRUI1Qzk0QzYNCiAgIEN1c3RvbVByb3BlcnRpZXMgUGluIChQaW5JZD1CRENFMTBCNTBGREQ0NDlCQjQ1NUU0NDk1MDM0MjM4NSxQaW5OYW1lPSJJbnB1dCIsRGlyZWN0aW9uPSJFR1BEX091dHB1dCIsUGluVHlwZS5QaW5DYXRlZ29yeT0iVHlwZSIsUGluVHlwZS5QaW5TdWJDYXRlZ29yeT0iIixQaW5UeXBlLlBpblN1YkNhdGVnb3J5T2JqZWN0PSIvU2NyaXB0L0NvcmVVT2JqZWN0LlNjcmlwdFN0cnVjdCcvU2NyaXB0L05pYWdhcmEuTmlhZ2FyYUJvb2wnIixQaW5UeXBlLlBpblN1YkNhdGVnb3J5TWVtYmVyUmVmZXJlbmNlPSgpLFBpblR5cGUuUGluVmFsdWVUeXBlPSgpLFBpblR5cGUuQ29udGFpbmVyVHlwZT1Ob25lLFBpblR5cGUuYklzUmVmZXJlbmNlPUZhbHNlLFBpblR5cGUuYklzQ29uc3Q9RmFsc2UsUGluVHlwZS5iSXNXZWFrUG9pbnRlcj1GYWxzZSxQaW5UeXBlLmJJc1VPYmplY3RXcmFwcGVyPUZhbHNlLFBpblR5cGUuYlNlcmlhbGl6ZUFzU2luZ2xlUHJlY2lzaW9uRmxvYXQ9RmFsc2UsUGVyc2lzdGVudEd1aWQ9MDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAsYkhpZGRlbj1GYWxzZSxiTm90Q29ubmVjdGFibGU9RmFsc2UsYkRlZmF1bHRWYWx1ZUlzUmVhZE9ubHk9RmFsc2UsYkRlZmF1bHRWYWx1ZUlzSWdub3JlZD1GYWxzZSxiQWR2YW5jZWRWaWV3PUZhbHNlLGJPcnBoYW5lZFBpbj1GYWxzZSwpDQpFbmQgT2JqZWN0DQo="
        End Object
    `,
    color: Configuration.nodeColors.gray,
    icon: null,
    pins: 1,
    pinNames: ["Input"],
    delegate: false,
    development: false,
})
