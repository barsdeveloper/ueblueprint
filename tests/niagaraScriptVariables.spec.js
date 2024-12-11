import { test, expect } from "./fixtures/test.js"

const serialized = source => source
    .replaceAll(/^\n|^ {12}| +$/gm, "")
    .replaceAll(/(?<=^Begin Object).+| +$|^ +ExportedNodes=.+/gm, "")
    .replaceAll("    ", "   ")

test.describe("Niagara ScriptVariables", () => {

    test.describe.configure({ mode: "serial" })

    test.beforeEach(async ({ page }) => {
        await page.reload()
    })

    test("Deserialization", async ({ blueprintPage }) => {
        expect(await blueprintPage.blueprintLocator.evaluate(blueprint => blueprint.entity.serialize()))
            .toEqual("Begin Object\nEnd Object\n")
        const source = String.raw`
            Begin Object Class=/Script/NiagaraEditor.NiagaraClipboardContent Name="NiagaraClipboardContent_5" ExportPath="/Script/NiagaraEditor.NiagaraClipboardContent'/Engine/Transient.NiagaraClipboardContent_5'"
                Begin Object Class=/Script/NiagaraEditor.NiagaraScriptVariable Name="NiagaraScriptVariable_7" ExportPath="/Script/NiagaraEditor.NiagaraScriptVariable'/Engine/Transient.NiagaraClipboardContent_5:NiagaraScriptVariable_7'"
                End Object
                Begin Object Class=/Script/NiagaraEditor.NiagaraScriptVariable Name="NiagaraScriptVariable_5" ExportPath="/Script/NiagaraEditor.NiagaraScriptVariable'/Engine/Transient.NiagaraClipboardContent_5:NiagaraScriptVariable_5'"
                End Object
                Begin Object Class=/Script/NiagaraEditor.NiagaraScriptVariable Name="NiagaraScriptVariable_4" ExportPath="/Script/NiagaraEditor.NiagaraScriptVariable'/Engine/Transient.NiagaraClipboardContent_5:NiagaraScriptVariable_4'"
                End Object
                Begin Object Class=/Script/NiagaraEditor.NiagaraScriptVariable Name="NiagaraScriptVariable_3" ExportPath="/Script/NiagaraEditor.NiagaraScriptVariable'/Engine/Transient.NiagaraClipboardContent_5:NiagaraScriptVariable_3'"
                End Object
                Begin Object Name="NiagaraScriptVariable_7" ExportPath="/Script/NiagaraEditor.NiagaraScriptVariable'/Engine/Transient.NiagaraClipboardContent_5:NiagaraScriptVariable_7'"
                    DefaultMode=FailIfPreviouslyNotSet
                    Variable=(VarData=(0,0,0,0,0,0,0,0,0,0,0,0),Name="Local.Module.NewOutput",TypeDefHandle=(RegisteredTypeIndex=91))
                    Metadata=(VariableGuid=D9FF507912C649B89A5AAADD786008F9)
                    DefaultValueVariant=(Bytes=(0,0,0,0,0,0,0,0,0,0,0,0),CurrentMode=Bytes)
                    ChangeId=ED5739C2B154491381BC513315173499
                End Object
                Begin Object Name="NiagaraScriptVariable_5" ExportPath="/Script/NiagaraEditor.NiagaraScriptVariable'/Engine/Transient.NiagaraClipboardContent_5:NiagaraScriptVariable_5'"
                    DefaultMode=FailIfPreviouslyNotSet
                    Variable=(VarData=(0,0,0,0,0,0,0,0,0,0,0,0),Name="Local.Module.Translation",TypeDefHandle=(RegisteredTypeIndex=88))
                    Metadata=(VariableGuid=BC9C97D335B94AB69773126210A3ECAE)
                    DefaultValueVariant=(Bytes=(0,0,0,0,0,0,0,0,0,0,0,0),CurrentMode=Bytes)
                    ChangeId=FE0D9E75CFBC4AE88F5BFAA9EF72667E
                End Object
                Begin Object Name="NiagaraScriptVariable_4" ExportPath="/Script/NiagaraEditor.NiagaraScriptVariable'/Engine/Transient.NiagaraClipboardContent_5:NiagaraScriptVariable_4'"
                    DefaultMode=FailIfPreviouslyNotSet
                    Variable=(VarData=(0,0,0,0),Name="Local.Module.CompressedQuaternion",TypeDefHandle=(RegisteredTypeIndex=83))
                    Metadata=(VariableGuid=9CAD9A77A2464300A77B2CE84F45D85D)
                    DefaultValueVariant=(Bytes=(0,0,0,0),CurrentMode=Bytes)
                    ChangeId=A8F32F2FA4944F3F8ED6054D7103F762
                End Object
                Begin Object Name="NiagaraScriptVariable_3" ExportPath="/Script/NiagaraEditor.NiagaraScriptVariable'/Engine/Transient.NiagaraClipboardContent_5:NiagaraScriptVariable_3'"
                    DefaultMode=FailIfPreviouslyNotSet
                    Variable=(VarData=(0,0,0,0),Name="Local.Module.Result",TypeDefHandle=(RegisteredTypeIndex=83))
                    Metadata=(VariableGuid=ABE0FABCD81C42C6A4F2773039AD2FBB)
                    DefaultValueVariant=(Bytes=(0,0,0,0),CurrentMode=Bytes)
                    ChangeId=0044A03337E24147A24A4DB6C9015E37
                End Object
                ScriptVariables(0)=(ScriptVariable="/Script/NiagaraEditor.NiagaraScriptVariable'NiagaraScriptVariable_3'",OriginalChangeId=0044A03337E24147A24A4DB6C9015E37)
                ScriptVariables(1)=(ScriptVariable="/Script/NiagaraEditor.NiagaraScriptVariable'NiagaraScriptVariable_4'",OriginalChangeId=A8F32F2FA4944F3F8ED6054D7103F762)
                ScriptVariables(2)=(ScriptVariable="/Script/NiagaraEditor.NiagaraScriptVariable'NiagaraScriptVariable_5'",OriginalChangeId=FE0D9E75CFBC4AE88F5BFAA9EF72667E)
                ScriptVariables(3)=(ScriptVariable="/Script/NiagaraEditor.NiagaraScriptVariable'NiagaraScriptVariable_7'",OriginalChangeId=ED5739C2B154491381BC513315173499)
                ExportedNodes="QmVnaW4gT2JqZWN0IENsYXNzPS9TY3JpcHQvTmlhZ2FyYUVkaXRvci5OaWFnYXJhTm9kZVBhcmFtZXRlck1hcFNldCBOYW1lPSJOaWFnYXJhTm9kZVBhcmFtZXRlck1hcFNldF8wIiBFeHBvcnRQYXRoPSIvU2NyaXB0L05pYWdhcmFFZGl0b3IuTmlhZ2FyYU5vZGVQYXJhbWV0ZXJNYXBTZXQnL0VuZ2luZS9UcmFuc2llbnQuTmV3TmlhZ2FyYVNjcmlwdDE6TmlhZ2FyYVNjcmlwdFNvdXJjZV8wLk5pYWdhcmFHcmFwaF8wLk5pYWdhcmFOb2RlUGFyYW1ldGVyTWFwU2V0XzAnIgogICBDaGFuZ2VJZD1GNzAzODdFQjVGOTQ0Mjk5ODc4M0M1NjNDMDVBRjQ1OA0KICAgTm9kZVBvc1g9NDMyDQogICBOb2RlUG9zWT0tMTc2DQogICBOb2RlR3VpZD0yOTkwRjBFOTg1Nzg0MTQ4OTk1QjJBOTRENkE5MjVDOQ0KICAgQ3VzdG9tUHJvcGVydGllcyBQaW4gKFBpbklkPTcxQTAyNzdGQUNEQzQwODU4MkVGMzQxNDlFMUYzMzRFLFBpbk5hbWU9IlNvdXJjZSIsUGluVHlwZS5QaW5DYXRlZ29yeT0iVHlwZSIsUGluVHlwZS5QaW5TdWJDYXRlZ29yeT0iIixQaW5UeXBlLlBpblN1YkNhdGVnb3J5T2JqZWN0PSIvU2NyaXB0L0NvcmVVT2JqZWN0LlNjcmlwdFN0cnVjdCcvU2NyaXB0L05pYWdhcmEuTmlhZ2FyYVBhcmFtZXRlck1hcCciLFBpblR5cGUuUGluU3ViQ2F0ZWdvcnlNZW1iZXJSZWZlcmVuY2U9KCksUGluVHlwZS5QaW5WYWx1ZVR5cGU9KCksUGluVHlwZS5Db250YWluZXJUeXBlPU5vbmUsUGluVHlwZS5iSXNSZWZlcmVuY2U9RmFsc2UsUGluVHlwZS5iSXNDb25zdD1GYWxzZSxQaW5UeXBlLmJJc1dlYWtQb2ludGVyPUZhbHNlLFBpblR5cGUuYklzVU9iamVjdFdyYXBwZXI9RmFsc2UsUGluVHlwZS5iU2VyaWFsaXplQXNTaW5nbGVQcmVjaXNpb25GbG9hdD1GYWxzZSxQZXJzaXN0ZW50R3VpZD0wMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMCxiSGlkZGVuPUZhbHNlLGJOb3RDb25uZWN0YWJsZT1GYWxzZSxiRGVmYXVsdFZhbHVlSXNSZWFkT25seT1GYWxzZSxiRGVmYXVsdFZhbHVlSXNJZ25vcmVkPUZhbHNlLGJBZHZhbmNlZFZpZXc9RmFsc2UsYk9ycGhhbmVkUGluPUZhbHNlLCkNCiAgIEN1c3RvbVByb3BlcnRpZXMgUGluIChQaW5JZD00OEEwNTc0QTU5NjU0QzMyQUEyOTRFMzUzMUYzOEE5OCxQaW5OYW1lPSJEZXN0IixEaXJlY3Rpb249IkVHUERfT3V0cHV0IixQaW5UeXBlLlBpbkNhdGVnb3J5PSJUeXBlIixQaW5UeXBlLlBpblN1YkNhdGVnb3J5PSIiLFBpblR5cGUuUGluU3ViQ2F0ZWdvcnlPYmplY3Q9Ii9TY3JpcHQvQ29yZVVPYmplY3QuU2NyaXB0U3RydWN0Jy9TY3JpcHQvTmlhZ2FyYS5OaWFnYXJhUGFyYW1ldGVyTWFwJyIsUGluVHlwZS5QaW5TdWJDYXRlZ29yeU1lbWJlclJlZmVyZW5jZT0oKSxQaW5UeXBlLlBpblZhbHVlVHlwZT0oKSxQaW5UeXBlLkNvbnRhaW5lclR5cGU9Tm9uZSxQaW5UeXBlLmJJc1JlZmVyZW5jZT1GYWxzZSxQaW5UeXBlLmJJc0NvbnN0PUZhbHNlLFBpblR5cGUuYklzV2Vha1BvaW50ZXI9RmFsc2UsUGluVHlwZS5iSXNVT2JqZWN0V3JhcHBlcj1GYWxzZSxQaW5UeXBlLmJTZXJpYWxpemVBc1NpbmdsZVByZWNpc2lvbkZsb2F0PUZhbHNlLFBlcnNpc3RlbnRHdWlkPTAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwLGJIaWRkZW49RmFsc2UsYk5vdENvbm5lY3RhYmxlPUZhbHNlLGJEZWZhdWx0VmFsdWVJc1JlYWRPbmx5PUZhbHNlLGJEZWZhdWx0VmFsdWVJc0lnbm9yZWQ9RmFsc2UsYkFkdmFuY2VkVmlldz1GYWxzZSxiT3JwaGFuZWRQaW49RmFsc2UsKQ0KICAgQ3VzdG9tUHJvcGVydGllcyBQaW4gKFBpbklkPTA5M0FCNTg1QkY3RTRBODJBRTJEMjkzREQwNDY0NkZFLFBpbk5hbWU9IkxvY2FsLk1vZHVsZS5SZXN1bHQiLFBpbkZyaWVuZGx5TmFtZT1JTlZURVhUKCJMb2NhbC5Nb2R1bGUuUmVzdWx0IiksUGluVHlwZS5QaW5DYXRlZ29yeT0iVHlwZSIsUGluVHlwZS5QaW5TdWJDYXRlZ29yeT0iUGFyYW1ldGVyUGluIixQaW5UeXBlLlBpblN1YkNhdGVnb3J5T2JqZWN0PSIvU2NyaXB0L0NvcmVVT2JqZWN0LlNjcmlwdFN0cnVjdCcvU2NyaXB0L05pYWdhcmEuTmlhZ2FyYUZsb2F0JyIsUGluVHlwZS5QaW5TdWJDYXRlZ29yeU1lbWJlclJlZmVyZW5jZT0oKSxQaW5UeXBlLlBpblZhbHVlVHlwZT0oKSxQaW5UeXBlLkNvbnRhaW5lclR5cGU9Tm9uZSxQaW5UeXBlLmJJc1JlZmVyZW5jZT1GYWxzZSxQaW5UeXBlLmJJc0NvbnN0PUZhbHNlLFBpblR5cGUuYklzV2Vha1BvaW50ZXI9RmFsc2UsUGluVHlwZS5iSXNVT2JqZWN0V3JhcHBlcj1GYWxzZSxQaW5UeXBlLmJTZXJpYWxpemVBc1NpbmdsZVByZWNpc2lvbkZsb2F0PUZhbHNlLExpbmtlZFRvPShOaWFnYXJhTm9kZU9wXzU5IEZBQzk1NkQ2NzdGMTQ2NjE4OTI2QjZDNUZGMzBCQ0Q5LCksUGVyc2lzdGVudEd1aWQ9NjE1NTE5RUM2RDA2NERBNjlCOTQzNzEwNEVGRDVGMTUsYkhpZGRlbj1GYWxzZSxiTm90Q29ubmVjdGFibGU9RmFsc2UsYkRlZmF1bHRWYWx1ZUlzUmVhZE9ubHk9RmFsc2UsYkRlZmF1bHRWYWx1ZUlzSWdub3JlZD1GYWxzZSxiQWR2YW5jZWRWaWV3PUZhbHNlLGJPcnBoYW5lZFBpbj1GYWxzZSwpDQogICBDdXN0b21Qcm9wZXJ0aWVzIFBpbiAoUGluSWQ9MzRGRjE0MjY5MTc1NDM4NkFEMjBFQzY5OTQwREQ4MUIsUGluTmFtZT0iTG9jYWwuTW9kdWxlLkNvbXByZXNzZWRRdWF0ZXJuaW9uIixQaW5GcmllbmRseU5hbWU9SU5WVEVYVCgiTG9jYWwuTW9kdWxlLkNvbXByZXNzZWRRdWF0ZXJuaW9uIiksUGluVHlwZS5QaW5DYXRlZ29yeT0iVHlwZSIsUGluVHlwZS5QaW5TdWJDYXRlZ29yeT0iUGFyYW1ldGVyUGluIixQaW5UeXBlLlBpblN1YkNhdGVnb3J5T2JqZWN0PSIvU2NyaXB0L0NvcmVVT2JqZWN0LlNjcmlwdFN0cnVjdCcvU2NyaXB0L05pYWdhcmEuTmlhZ2FyYUZsb2F0JyIsUGluVHlwZS5QaW5TdWJDYXRlZ29yeU1lbWJlclJlZmVyZW5jZT0oKSxQaW5UeXBlLlBpblZhbHVlVHlwZT0oKSxQaW5UeXBlLkNvbnRhaW5lclR5cGU9Tm9uZSxQaW5UeXBlLmJJc1JlZmVyZW5jZT1GYWxzZSxQaW5UeXBlLmJJc0NvbnN0PUZhbHNlLFBpblR5cGUuYklzV2Vha1BvaW50ZXI9RmFsc2UsUGluVHlwZS5iSXNVT2JqZWN0V3JhcHBlcj1GYWxzZSxQaW5UeXBlLmJTZXJpYWxpemVBc1NpbmdsZVByZWNpc2lvbkZsb2F0PUZhbHNlLExpbmtlZFRvPShOaWFnYXJhTm9kZUZ1bmN0aW9uQ2FsbF8xOTQgOTg0NDQ2NzY4NUJFNEEyNThEMzgzRUY2RERGN0VDNUMsKSxQZXJzaXN0ZW50R3VpZD03RjY5OTA4NDM2RkM0OUYxQjEyNDJBOEJCNDBEQjdEQixiSGlkZGVuPUZhbHNlLGJOb3RDb25uZWN0YWJsZT1GYWxzZSxiRGVmYXVsdFZhbHVlSXNSZWFkT25seT1GYWxzZSxiRGVmYXVsdFZhbHVlSXNJZ25vcmVkPUZhbHNlLGJBZHZhbmNlZFZpZXc9RmFsc2UsYk9ycGhhbmVkUGluPUZhbHNlLCkNCiAgIEN1c3RvbVByb3BlcnRpZXMgUGluIChQaW5JZD0wMTJGMTFBNjgwQzE0MjkxODg5MjJCNTM2M0I5OUNDRSxQaW5OYW1lPSJMb2NhbC5Nb2R1bGUuVHJhbnNsYXRpb24iLFBpbkZyaWVuZGx5TmFtZT1JTlZURVhUKCJMb2NhbC5Nb2R1bGUuVHJhbnNsYXRpb24iKSxQaW5UeXBlLlBpbkNhdGVnb3J5PSJUeXBlIixQaW5UeXBlLlBpblN1YkNhdGVnb3J5PSJQYXJhbWV0ZXJQaW4iLFBpblR5cGUuUGluU3ViQ2F0ZWdvcnlPYmplY3Q9Ii9TY3JpcHQvQ29yZVVPYmplY3QuU2NyaXB0U3RydWN0Jy9TY3JpcHQvQ29yZVVPYmplY3QuVmVjdG9yM2YnIixQaW5UeXBlLlBpblN1YkNhdGVnb3J5TWVtYmVyUmVmZXJlbmNlPSgpLFBpblR5cGUuUGluVmFsdWVUeXBlPSgpLFBpblR5cGUuQ29udGFpbmVyVHlwZT1Ob25lLFBpblR5cGUuYklzUmVmZXJlbmNlPUZhbHNlLFBpblR5cGUuYklzQ29uc3Q9RmFsc2UsUGluVHlwZS5iSXNXZWFrUG9pbnRlcj1GYWxzZSxQaW5UeXBlLmJJc1VPYmplY3RXcmFwcGVyPUZhbHNlLFBpblR5cGUuYlNlcmlhbGl6ZUFzU2luZ2xlUHJlY2lzaW9uRmxvYXQ9RmFsc2UsTGlua2VkVG89KE5pYWdhcmFOb2RlUGFyYW1ldGVyTWFwR2V0XzAgOUNFQ0UwNzY0NEM1NDBFRUJBMEFDQjQyMEZDMkJBNjEsKSxQZXJzaXN0ZW50R3VpZD0zMEQxOTI5MUU0MUY0QzUwQUUzNUJDNkU4QTIxMEUyQixiSGlkZGVuPUZhbHNlLGJOb3RDb25uZWN0YWJsZT1GYWxzZSxiRGVmYXVsdFZhbHVlSXNSZWFkT25seT1GYWxzZSxiRGVmYXVsdFZhbHVlSXNJZ25vcmVkPUZhbHNlLGJBZHZhbmNlZFZpZXc9RmFsc2UsYk9ycGhhbmVkUGluPUZhbHNlLCkNCiAgIEN1c3RvbVByb3BlcnRpZXMgUGluIChQaW5JZD1DOTI5NEFEOUFERTE0M0I3OEM5MzE0QzBENEYyNkYxMyxQaW5OYW1lPSJMb2NhbC5Nb2R1bGUuTmV3T3V0cHV0IixQaW5GcmllbmRseU5hbWU9SU5WVEVYVCgiTG9jYWwuTW9kdWxlLk5ld091dHB1dCIpLFBpblR5cGUuUGluQ2F0ZWdvcnk9IlR5cGUiLFBpblR5cGUuUGluU3ViQ2F0ZWdvcnk9IlBhcmFtZXRlclBpbiIsUGluVHlwZS5QaW5TdWJDYXRlZ29yeU9iamVjdD0iL1NjcmlwdC9Db3JlVU9iamVjdC5TY3JpcHRTdHJ1Y3QnL1NjcmlwdC9OaWFnYXJhLk5pYWdhcmFQb3NpdGlvbiciLFBpblR5cGUuUGluU3ViQ2F0ZWdvcnlNZW1iZXJSZWZlcmVuY2U9KCksUGluVHlwZS5QaW5WYWx1ZVR5cGU9KCksUGluVHlwZS5Db250YWluZXJUeXBlPU5vbmUsUGluVHlwZS5iSXNSZWZlcmVuY2U9RmFsc2UsUGluVHlwZS5iSXNDb25zdD1GYWxzZSxQaW5UeXBlLmJJc1dlYWtQb2ludGVyPUZhbHNlLFBpblR5cGUuYklzVU9iamVjdFdyYXBwZXI9RmFsc2UsUGluVHlwZS5iU2VyaWFsaXplQXNTaW5nbGVQcmVjaXNpb25GbG9hdD1GYWxzZSxMaW5rZWRUbz0oTmlhZ2FyYU5vZGVGdW5jdGlvbkNhbGxfMTIwIEYyRjIwM0ZDMTNCODQ4QkFBRDFERDY1MENDRjJERjEzLCksUGVyc2lzdGVudEd1aWQ9Rjk0MjU2MkQ4ODQyNEEwMjgyMzJBQkExODQ5OTkxOTEsYkhpZGRlbj1GYWxzZSxiTm90Q29ubmVjdGFibGU9RmFsc2UsYkRlZmF1bHRWYWx1ZUlzUmVhZE9ubHk9RmFsc2UsYkRlZmF1bHRWYWx1ZUlzSWdub3JlZD1GYWxzZSxiQWR2YW5jZWRWaWV3PUZhbHNlLGJPcnBoYW5lZFBpbj1GYWxzZSwpDQogICBDdXN0b21Qcm9wZXJ0aWVzIFBpbiAoUGluSWQ9Q0EzMjQyRTYzMkM0NEU4OUEzNTRFQjUxNEY5QkNDRjMsUGluTmFtZT0iQWRkIixQaW5UeXBlLlBpbkNhdGVnb3J5PSJNaXNjIixQaW5UeXBlLlBpblN1YkNhdGVnb3J5PSJEeW5hbWljQWRkUGluIixQaW5UeXBlLlBpblN1YkNhdGVnb3J5T2JqZWN0PU5vbmUsUGluVHlwZS5QaW5TdWJDYXRlZ29yeU1lbWJlclJlZmVyZW5jZT0oKSxQaW5UeXBlLlBpblZhbHVlVHlwZT0oKSxQaW5UeXBlLkNvbnRhaW5lclR5cGU9Tm9uZSxQaW5UeXBlLmJJc1JlZmVyZW5jZT1GYWxzZSxQaW5UeXBlLmJJc0NvbnN0PUZhbHNlLFBpblR5cGUuYklzV2Vha1BvaW50ZXI9RmFsc2UsUGluVHlwZS5iSXNVT2JqZWN0V3JhcHBlcj1GYWxzZSxQaW5UeXBlLmJTZXJpYWxpemVBc1NpbmdsZVByZWNpc2lvbkZsb2F0PUZhbHNlLFBlcnNpc3RlbnRHdWlkPTAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwLGJIaWRkZW49RmFsc2UsYk5vdENvbm5lY3RhYmxlPUZhbHNlLGJEZWZhdWx0VmFsdWVJc1JlYWRPbmx5PUZhbHNlLGJEZWZhdWx0VmFsdWVJc0lnbm9yZWQ9RmFsc2UsYkFkdmFuY2VkVmlldz1GYWxzZSxiT3JwaGFuZWRQaW49RmFsc2UsKQ0KRW5kIE9iamVjdA0K"
            End Object
        `
        await blueprintPage.paste(source)
        expect(await blueprintPage.blueprintLocator.evaluate(blueprint => blueprint.entity.serialize()))
            .toEqual(serialized(source))
    })

    test("Existing variable", async ({ blueprintPage }) => {
        expect(await blueprintPage.blueprintLocator.evaluate(blueprint => blueprint.entity.serialize()))
            .toEqual("Begin Object\nEnd Object\n")
        let source = String.raw`
            Begin Object Class=/Script/NiagaraEditor.NiagaraClipboardContent Name="NiagaraClipboardContent_1" ExportPath="/Script/NiagaraEditor.NiagaraClipboardContent'/Engine/Transient.NiagaraClipboardContent_1'"
                Begin Object Class=/Script/NiagaraEditor.NiagaraScriptVariable Name="NiagaraScriptVariable_0" ExportPath="/Script/NiagaraEditor.NiagaraScriptVariable'/Engine/Transient.NiagaraClipboardContent_1:NiagaraScriptVariable_0'"
                End Object
                Begin Object Class=/Script/NiagaraEditor.NiagaraScriptVariable Name="NiagaraScriptVariable_2" ExportPath="/Script/NiagaraEditor.NiagaraScriptVariable'/Engine/Transient.NiagaraClipboardContent_1:NiagaraScriptVariable_2'"
                End Object
                Begin Object Name="NiagaraScriptVariable_0" ExportPath="/Script/NiagaraEditor.NiagaraScriptVariable'/Engine/Transient.NiagaraClipboardContent_1:NiagaraScriptVariable_0'"
                    Variable=(VarData=(0,0,0,0,0,0,0,0,0,0,0,0),Name="Module.B",TypeDefHandle=(RegisteredTypeIndex=91))
                    Metadata=(VariableGuid=74CE7A265A06491AB76AE33EC9455B32)
                    DefaultValueVariant=(Bytes=(0,0,0,0,0,0,0,0,0,0,0,0),CurrentMode=Bytes)
                    ChangeId=9EF012F75DA2433BBFC2F81B1B9B0A6F
                End Object
                Begin Object Name="NiagaraScriptVariable_2" ExportPath="/Script/NiagaraEditor.NiagaraScriptVariable'/Engine/Transient.NiagaraClipboardContent_1:NiagaraScriptVariable_2'"
                    Variable=(VarData=(0,0,0,0,0,0,0,0,0,0,0,0),Name="Module.Default",TypeDefHandle=(RegisteredTypeIndex=88))
                    Metadata=(VariableGuid=8A6D271C4C9DED64D135438A48373391)
                    DefaultValueVariant=(Bytes=(0,0,0,0,0,0,0,0,0,0,0,0),CurrentMode=Bytes)
                    ChangeId=38DB31CC4AF2996F0AEB61A32004D026
                End Object
                ScriptVariables(0)=(ScriptVariable="/Script/NiagaraEditor.NiagaraScriptVariable'NiagaraScriptVariable_2'",OriginalChangeId=38DB31CC4AF2996F0AEB61A32004D026)
                ScriptVariables(1)=(ScriptVariable="/Script/NiagaraEditor.NiagaraScriptVariable'NiagaraScriptVariable_0'",OriginalChangeId=9EF012F75DA2433BBFC2F81B1B9B0A6F)
            End Object
        `
        await blueprintPage.paste(source)
        expect(await blueprintPage.blueprintLocator.evaluate(blueprint => blueprint.entity.serialize()))
            .toEqual(serialized(source))
        // NiagaraScriptVariable_1 (Module.B) already existst with name NiagaraScriptVariable_0
        source = String.raw`
            Begin Object Class=/Script/NiagaraEditor.NiagaraClipboardContent Name="NiagaraClipboardContent_1" ExportPath="/Script/NiagaraEditor.NiagaraClipboardContent'/Engine/Transient.NiagaraClipboardContent_1'"
                Begin Object Class=/Script/NiagaraEditor.NiagaraScriptVariable Name="NiagaraScriptVariable_1" ExportPath="/Script/NiagaraEditor.NiagaraScriptVariable'/Engine/Transient.NiagaraClipboardContent_1:NiagaraScriptVariable_1'"
                End Object
                Begin Object Class=/Script/NiagaraEditor.NiagaraScriptVariable Name="NiagaraScriptVariable_2" ExportPath="/Script/NiagaraEditor.NiagaraScriptVariable'/Engine/Transient.NiagaraClipboardContent_1:NiagaraScriptVariable_2'"
                End Object
                Begin Object Name="NiagaraScriptVariable_1" ExportPath="/Script/NiagaraEditor.NiagaraScriptVariable'/Engine/Transient.NiagaraClipboardContent_1:NiagaraScriptVariable_1'"
                    Variable=(VarData=(0,0,0,0,0,0,0,0,0,0,0,0),Name="Module.B",TypeDefHandle=(RegisteredTypeIndex=91))
                    Metadata=(VariableGuid=74CE7A265A06491AB76AE33EC9455B32)
                    DefaultValueVariant=(Bytes=(0,0,0,0,0,0,0,0,0,0,0,0),CurrentMode=Bytes)
                    ChangeId=9EF012F75DA2433BBFC2F81B1B9B0A6F
                End Object
                Begin Object Name="NiagaraScriptVariable_2" ExportPath="/Script/NiagaraEditor.NiagaraScriptVariable'/Engine/Transient.NiagaraClipboardContent_1:NiagaraScriptVariable_2'"
                    Variable=(VarData=(0,0,0,0,0,0,0,0,0,0,0,0),Name="Module.Default",TypeDefHandle=(RegisteredTypeIndex=88))
                    Metadata=(VariableGuid=8A6D271C4C9DED64D135438A48373391)
                    DefaultValueVariant=(Bytes=(0,0,0,0,0,0,0,0,0,0,0,0),CurrentMode=Bytes)
                    ChangeId=38DB31CC4AF2996F0AEB61A32004D026
                End Object
                ScriptVariables(0)=(ScriptVariable="/Script/NiagaraEditor.NiagaraScriptVariable'NiagaraScriptVariable_2'",OriginalChangeId=38DB31CC4AF2996F0AEB61A32004D026)
                ScriptVariables(1)=(ScriptVariable="/Script/NiagaraEditor.NiagaraScriptVariable'NiagaraScriptVariable_1'",OriginalChangeId=9EF012F75DA2433BBFC2F81B1B9B0A6F)
            End Object
        `
        await blueprintPage.paste(source)
        source = String.raw`
            Begin Object Class=/Script/NiagaraEditor.NiagaraClipboardContent Name="NiagaraClipboardContent_1" ExportPath="/Script/NiagaraEditor.NiagaraClipboardContent'/Engine/Transient.NiagaraClipboardContent_1'"
                Begin Object Class=/Script/NiagaraEditor.NiagaraScriptVariable Name="NiagaraScriptVariable_0" ExportPath="/Script/NiagaraEditor.NiagaraScriptVariable'/Engine/Transient.NiagaraClipboardContent_1:NiagaraScriptVariable_0'"
                End Object
                Begin Object Class=/Script/NiagaraEditor.NiagaraScriptVariable Name="NiagaraScriptVariable_2" ExportPath="/Script/NiagaraEditor.NiagaraScriptVariable'/Engine/Transient.NiagaraClipboardContent_1:NiagaraScriptVariable_2'"
                End Object
                Begin Object Name="NiagaraScriptVariable_0" ExportPath="/Script/NiagaraEditor.NiagaraScriptVariable'/Engine/Transient.NiagaraClipboardContent_1:NiagaraScriptVariable_0'"
                    Variable=(VarData=(0,0,0,0,0,0,0,0,0,0,0,0),Name="Module.B",TypeDefHandle=(RegisteredTypeIndex=91))
                    Metadata=(VariableGuid=74CE7A265A06491AB76AE33EC9455B32)
                    DefaultValueVariant=(Bytes=(0,0,0,0,0,0,0,0,0,0,0,0),CurrentMode=Bytes)
                    ChangeId=9EF012F75DA2433BBFC2F81B1B9B0A6F
                End Object
                Begin Object Name="NiagaraScriptVariable_2" ExportPath="/Script/NiagaraEditor.NiagaraScriptVariable'/Engine/Transient.NiagaraClipboardContent_1:NiagaraScriptVariable_2'"
                    Variable=(VarData=(0,0,0,0,0,0,0,0,0,0,0,0),Name="Module.Default",TypeDefHandle=(RegisteredTypeIndex=88))
                    Metadata=(VariableGuid=8A6D271C4C9DED64D135438A48373391)
                    DefaultValueVariant=(Bytes=(0,0,0,0,0,0,0,0,0,0,0,0),CurrentMode=Bytes)
                    ChangeId=38DB31CC4AF2996F0AEB61A32004D026
                End Object
                ScriptVariables(0)=(ScriptVariable="/Script/NiagaraEditor.NiagaraScriptVariable'NiagaraScriptVariable_2'",OriginalChangeId=38DB31CC4AF2996F0AEB61A32004D026)
                ScriptVariables(1)=(ScriptVariable="/Script/NiagaraEditor.NiagaraScriptVariable'NiagaraScriptVariable_0'",OriginalChangeId=9EF012F75DA2433BBFC2F81B1B9B0A6F)
            End Object
        `
        expect(await blueprintPage.blueprintLocator.evaluate(blueprint => blueprint.entity.serialize()))
            .toEqual(serialized(source))
    })

    test("Avoid adding existing variable", async ({ blueprintPage }) => {
    })
})
