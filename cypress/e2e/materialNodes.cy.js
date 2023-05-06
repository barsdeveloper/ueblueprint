/// <reference types="cypress" />

import Configuration from "../../js/Configuration.js"
import generateNodeTests from "../fixtures/testUtilities.js"
import LinearColorEntity from "../../js/entity/LinearColorEntity.js"
import Utility from "../../js/Utility.js"
import VectorEntity from "../../js/entity/VectorEntity.js"

const tests = [
    {
        name: "Comment",
        value: String.raw`
            Begin Object Class=/Script/UnrealEd.MaterialGraphNode_Comment Name="MaterialGraphNode_Comment_0" ExportPath=/Script/UnrealEd.MaterialGraphNode_Comment'"/Engine/Transient.M_CobbleStone_Smooth:MaterialGraph_0.MaterialGraphNode_Comment_0"'
                Begin Object Class=/Script/Engine.MaterialExpressionComment Name="MaterialExpressionComment_0" ExportPath=/Script/Engine.MaterialExpressionComment'"/Engine/Transient.M_CobbleStone_Smooth:MaterialGraph_0.MaterialGraphNode_Comment_0.MaterialExpressionComment_0"'
                End Object
                Begin Object Name="MaterialExpressionComment_0" ExportPath=/Script/Engine.MaterialExpressionComment'"/Engine/Transient.M_CobbleStone_Smooth:MaterialGraph_0.MaterialGraphNode_Comment_0.MaterialExpressionComment_0"'
                    SizeX=249
                    SizeY=165
                    Text="Comment"
                    MaterialExpressionEditorX=-5920
                    MaterialExpressionEditorY=-704
                    MaterialExpressionGuid=E21961B2B09144CF8607171C9D1E3489
                End Object
                MaterialExpressionComment=/Script/Engine.MaterialExpressionComment'"MaterialExpressionComment_0"'
                bCommentBubbleVisible_InDetailsPanel=False
                NodePosX=-5920
                NodePosY=-704
                NodeWidth=249
                NodeHeight=165
                bCommentBubblePinned=False
                bCommentBubbleVisible=False
                NodeComment="Comment"
                NodeGuid=A04CE0EEECF047A4918AC9B13818854E
            End Object
        `,
        delegate: false,
        development: false,
    },
    {
        name: "Constant",
        title: "1e+04",
        value: String.raw`
            Begin Object Class=/Script/UnrealEd.MaterialGraphNode Name="MaterialGraphNode_41" ExportPath=/Script/UnrealEd.MaterialGraphNode'"/Engine/Transient.M_Brick_Cut_Stone:MaterialGraph_0.MaterialGraphNode_41"'
                Begin Object Class=/Script/Engine.MaterialExpressionConstant Name="MaterialExpressionConstant_0" ExportPath=/Script/Engine.MaterialExpressionConstant'"/Engine/Transient.M_Brick_Cut_Stone:MaterialGraph_0.MaterialGraphNode_41.MaterialExpressionConstant_0"'
                End Object
                Begin Object Name="MaterialExpressionConstant_0" ExportPath=/Script/Engine.MaterialExpressionConstant'"/Engine/Transient.M_Brick_Cut_Stone:MaterialGraph_0.MaterialGraphNode_41.MaterialExpressionConstant_0"'
                    R=10000.000000
                    MaterialExpressionEditorX=-1328
                    MaterialExpressionEditorY=-880
                    MaterialExpressionGuid=1149D6828E794743B8343514F4B5E579
                    Material=/Script/UnrealEd.PreviewMaterial'"/Engine/Transient.M_Brick_Cut_Stone"'
                    bCollapsed=False
                End Object
                MaterialExpression=/Script/Engine.MaterialExpressionConstant'"MaterialExpressionConstant_0"'
                NodePosX=-1328
                NodePosY=-880
                NodeGuid=087DAB628E1148BE89BB1DBC720109F1
                CustomProperties Pin (PinId=A4EA20596A6C410598615F5328D298C4,PinName="Value",PinType.PinCategory="optional",PinType.PinSubCategory="red",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,DefaultValue="10000.0",PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=True,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
                CustomProperties Pin (PinId=99BE24A176124E02830C5F17A7DEF554,PinName="Output",PinFriendlyName=NSLOCTEXT("MaterialGraphNode", "Space", " "),Direction="EGPD_Output",PinType.PinCategory="",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
            End Object
        `,
        color: Configuration.nodeColors.green,
        icon: false,
        pins: 2,
        pinName: ["Value"],
        delegate: false,
        development: false,
        additionalTest:
            /** @param {import("../../js/element/NodeElement.js").default} node */
            node => {
                /** 
                 * @typedef {import("../../js/element/PinElement.js").default<Number>} NumberPinEntity
                 * @typedef {import("../../js/element/InputElement.js").default} InputElement
                 */
                const value = 10000.0
                const constantPin = /** @type {NumberPinEntity} */(node.querySelectorAll("ueb-pin")[0])
                expect(Utility.approximatelyEqual(constantPin.getDefaultValue(), value)).to.be.true
                /** @type {NodeListOf<InputElement>} */
                const inputFields = node.querySelectorAll("ueb-input")
                expect(inputFields).to.be.lengthOf(1)
                expect(inputFields[0].innerText).to.equal(Utility.printNumber(value))
            }
    },
    {
        name: "Constance2Vector",
        title: "0.1,23.9",
        value: String.raw`
            Begin Object Class=/Script/UnrealEd.MaterialGraphNode Name="MaterialGraphNode_42" ExportPath=/Script/UnrealEd.MaterialGraphNode'"/Engine/Transient.M_Brick_Cut_Stone:MaterialGraph_0.MaterialGraphNode_42"'
                Begin Object Class=/Script/Engine.MaterialExpressionConstant2Vector Name="MaterialExpressionConstant2Vector_1" ExportPath=/Script/Engine.MaterialExpressionConstant2Vector'"/Engine/Transient.M_Brick_Cut_Stone:MaterialGraph_0.MaterialGraphNode_42.MaterialExpressionConstant2Vector_1"'
                End Object
                Begin Object Name="MaterialExpressionConstant2Vector_1" ExportPath=/Script/Engine.MaterialExpressionConstant2Vector'"/Engine/Transient.M_Brick_Cut_Stone:MaterialGraph_0.MaterialGraphNode_42.MaterialExpressionConstant2Vector_1"'
                    R=0.100000
                    G=23.888880
                    MaterialExpressionEditorX=-1312
                    MaterialExpressionEditorY=-1312
                    MaterialExpressionGuid=E1302404B22A4D66BB39F9C2652EA0A5
                    Material=/Script/UnrealEd.PreviewMaterial'"/Engine/Transient.M_Brick_Cut_Stone"'
                End Object
                MaterialExpression=/Script/Engine.MaterialExpressionConstant2Vector'"MaterialExpressionConstant2Vector_1"'
                NodePosX=-1312
                NodePosY=-1312
                NodeGuid=50998E65A4E54B04A39EADA323DEEEE0
                CustomProperties Pin (PinId=F0B9EDE0763E414096FA82A0C1D3B3D3,PinName="X",PinType.PinCategory="optional",PinType.PinSubCategory="red",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,DefaultValue="0.1",PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=True,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
                CustomProperties Pin (PinId=A5A2FCBE348D4075A3F7FCAD9299C9CB,PinName="Y",PinType.PinCategory="optional",PinType.PinSubCategory="red",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,DefaultValue="23.88888",PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=True,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
                CustomProperties Pin (PinId=FF6B0DF61B3849DEA00B539430E73C90,PinName="Output",PinFriendlyName=NSLOCTEXT("MaterialGraphNode", "Space", " "),Direction="EGPD_Output",PinType.PinCategory="mask",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
                CustomProperties Pin (PinId=68FF49DB3534433CB8A7486036E434B7,PinName="Output2",PinFriendlyName=NSLOCTEXT("MaterialGraphNode", "Space", " "),Direction="EGPD_Output",PinType.PinCategory="mask",PinType.PinSubCategory="red",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
                CustomProperties Pin (PinId=A98F7CB8EB5D467D8E2217BF4A1AFA71,PinName="Output3",PinFriendlyName=NSLOCTEXT("MaterialGraphNode", "Space", " "),Direction="EGPD_Output",PinType.PinCategory="mask",PinType.PinSubCategory="green",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
            End Object
        `,
        color: Configuration.nodeColors.yellow,
        icon: false,
        pins: 5,
        pinName: ["X", "Y"],
        delegate: false,
        development: false,
        additionalTest:
            /** @param {import("../../js/element/NodeElement.js").default} node */
            node => {
                /** 
                 * @typedef {import("../../js/element/PinElement.js").default<VectorEntity>} VectorPinElement
                 * @typedef {import("../../js/element/InputElement.js").default} InputElement
                 */
                const x = 0.1
                const y = 23.88888
                const xPin = /** @type {VectorPinElement} */(node.querySelectorAll("ueb-pin")[0])
                const yPin = /** @type {VectorPinElement} */(node.querySelectorAll("ueb-pin")[1])
                expect(Utility.approximatelyEqual(xPin.getDefaultValue(), x)).to.be.true
                expect(Utility.approximatelyEqual(yPin.getDefaultValue(), y)).to.be.true
                /** @type {NodeListOf<InputElement>} */
                const inputFields = node.querySelectorAll("ueb-input")
                expect(inputFields).to.be.lengthOf(2)
                expect(inputFields[0].innerText).to.equal(Utility.printNumber(x))
                expect(inputFields[1].innerText).to.equal(Utility.printNumber(y))
            }
    },
    {
        name: "Constant3Vector",
        title: "0.00432,123,7.66e+09",
        value: String.raw`
            Begin Object Class=/Script/UnrealEd.MaterialGraphNode Name="MaterialGraphNode_40" ExportPath=/Script/UnrealEd.MaterialGraphNode'"/Engine/Transient.M_Brick_Cut_Stone:MaterialGraph_0.MaterialGraphNode_40"'
                Begin Object Class=/Script/Engine.MaterialExpressionConstant3Vector Name="MaterialExpressionConstant3Vector_1" ExportPath=/Script/Engine.MaterialExpressionConstant3Vector'"/Engine/Transient.M_Brick_Cut_Stone:MaterialGraph_0.MaterialGraphNode_40.MaterialExpressionConstant3Vector_1"'
                End Object
                Begin Object Name="MaterialExpressionConstant3Vector_1" ExportPath=/Script/Engine.MaterialExpressionConstant3Vector'"/Engine/Transient.M_Brick_Cut_Stone:MaterialGraph_0.MaterialGraphNode_40.MaterialExpressionConstant3Vector_1"'
                    Constant=(R=0.004320,G=123.199997,B=7657650176.000000,A=0.000000)
                    MaterialExpressionEditorX=-2592
                    MaterialExpressionEditorY=-688
                    MaterialExpressionGuid=6854D92803B449F79902FC5BE6D244F9
                    Material=/Script/UnrealEd.PreviewMaterial'"/Engine/Transient.M_Brick_Cut_Stone"'
                End Object
                MaterialExpression=/Script/Engine.MaterialExpressionConstant3Vector'"MaterialExpressionConstant3Vector_1"'
                NodePosX=-2592
                NodePosY=-688
                NodeGuid=A166C6EF5D5D4C298F8549BFCD353E30
                CustomProperties Pin (PinId=8CFCA073717A4E7795F803C9A3F3ADA6,PinName="Constant",PinType.PinCategory="optional",PinType.PinSubCategory="rgb",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,DefaultValue="0.00432,123.199997,7657650176.0",PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=True,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
                CustomProperties Pin (PinId=CD2387366A1745BA9A1F861F7698480A,PinName="Output",PinFriendlyName=NSLOCTEXT("MaterialGraphNode", "Space", " "),Direction="EGPD_Output",PinType.PinCategory="mask",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
                CustomProperties Pin (PinId=F1B3B937A4074949AA46A2D9743D51A1,PinName="Output2",PinFriendlyName=NSLOCTEXT("MaterialGraphNode", "Space", " "),Direction="EGPD_Output",PinType.PinCategory="mask",PinType.PinSubCategory="red",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
                CustomProperties Pin (PinId=2EE41C91F9B841ADA834AA42D10ADE20,PinName="Output3",PinFriendlyName=NSLOCTEXT("MaterialGraphNode", "Space", " "),Direction="EGPD_Output",PinType.PinCategory="mask",PinType.PinSubCategory="green",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
                CustomProperties Pin (PinId=A4B265999B284DB0A5175E969C471A17,PinName="Output4",PinFriendlyName=NSLOCTEXT("MaterialGraphNode", "Space", " "),Direction="EGPD_Output",PinType.PinCategory="mask",PinType.PinSubCategory="blue",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
            End Object
        `,
        color: Configuration.nodeColors.yellow,
        icon: false,
        pins: 5,
        pinName: ["Constant"],
        delegate: false,
        development: false,
        additionalTest:
            /** @param {import("../../js/element/NodeElement.js").default} node */
            node => {
                /** 
                 * @typedef {import("../../js/element/PinElement.js").default<VectorEntity>} VectorPinElement
                 * @typedef {import("../../js/element/InputElement.js").default} InputElement
                 */
                const x = 0.00432
                const y = 123.199997
                const z = 7657650176.0
                const constantPin = /** @type {VectorPinElement} */(node.querySelectorAll("ueb-pin")[0])
                expect(Utility.approximatelyEqual(constantPin.getDefaultValue().X, x)).to.be.true
                expect(Utility.approximatelyEqual(constantPin.getDefaultValue().Y, y)).to.be.true
                expect(Utility.approximatelyEqual(constantPin.getDefaultValue().Z, z)).to.be.true
                /** @type {NodeListOf<InputElement>} */
                const inputFields = node.querySelectorAll("ueb-input")
                expect(inputFields).to.be.lengthOf(3)
                expect(inputFields[0].innerText).to.equal(Utility.printNumber(x))
                expect(inputFields[1].innerText).to.equal(Utility.printNumber(y))
                expect(inputFields[2].innerText).to.equal(Utility.printNumber(z))
            }
    },
    {
        name: "Constant4Vector",
        title: "4,10.5,2.5e+03,0.33",
        value: String.raw`
            Begin Object Class=/Script/UnrealEd.MaterialGraphNode Name="MaterialGraphNode_45" ExportPath=/Script/UnrealEd.MaterialGraphNode'"/Engine/Transient.M_Brick_Cut_Stone:MaterialGraph_0.MaterialGraphNode_45"'
                Begin Object Class=/Script/Engine.MaterialExpressionConstant4Vector Name="MaterialExpressionConstant4Vector_1" ExportPath=/Script/Engine.MaterialExpressionConstant4Vector'"/Engine/Transient.M_Brick_Cut_Stone:MaterialGraph_0.MaterialGraphNode_45.MaterialExpressionConstant4Vector_1"'
                End Object
                Begin Object Name="MaterialExpressionConstant4Vector_1" ExportPath=/Script/Engine.MaterialExpressionConstant4Vector'"/Engine/Transient.M_Brick_Cut_Stone:MaterialGraph_0.MaterialGraphNode_45.MaterialExpressionConstant4Vector_1"'
                    Constant=(R=4.000000,G=10.500000,B=2500.669922,A=0.330000)
                    MaterialExpressionEditorX=-2864
                    MaterialExpressionEditorY=-1600
                    MaterialExpressionGuid=FA680399FB1F40299DCCD649976E2007
                    Material=/Script/UnrealEd.PreviewMaterial'"/Engine/Transient.M_Brick_Cut_Stone"'
                End Object
                MaterialExpression=/Script/Engine.MaterialExpressionConstant4Vector'"MaterialExpressionConstant4Vector_1"'
                NodePosX=-2864
                NodePosY=-1600
                NodeGuid=E48583AF6A9443409451AADB2BB950D8
                CustomProperties Pin (PinId=053AE05C1AE341DA9DF315E7AD1C181C,PinName="Constant",PinType.PinCategory="optional",PinType.PinSubCategory="rgba",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,DefaultValue="(R=4.000000,G=10.500000,B=2500.669922,A=0.330000)",PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=True,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
                CustomProperties Pin (PinId=DE4B35BE73EA4746848199EF88522E9F,PinName="Output",PinFriendlyName=NSLOCTEXT("MaterialGraphNode", "Space", " "),Direction="EGPD_Output",PinType.PinCategory="mask",PinType.PinSubCategory="rgba",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
                CustomProperties Pin (PinId=68ECEB1DC6FD474285DCD24084C6791D,PinName="Output2",PinFriendlyName=NSLOCTEXT("MaterialGraphNode", "Space", " "),Direction="EGPD_Output",PinType.PinCategory="mask",PinType.PinSubCategory="red",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
                CustomProperties Pin (PinId=4781E87620764899BAFA52A198FBD3CD,PinName="Output3",PinFriendlyName=NSLOCTEXT("MaterialGraphNode", "Space", " "),Direction="EGPD_Output",PinType.PinCategory="mask",PinType.PinSubCategory="green",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
                CustomProperties Pin (PinId=447371DFAD4C468993232380A3E37707,PinName="Output4",PinFriendlyName=NSLOCTEXT("MaterialGraphNode", "Space", " "),Direction="EGPD_Output",PinType.PinCategory="mask",PinType.PinSubCategory="blue",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
                CustomProperties Pin (PinId=AFCF5ADE766948A2889F0FAC51FDA44D,PinName="Output5",PinFriendlyName=NSLOCTEXT("MaterialGraphNode", "Space", " "),Direction="EGPD_Output",PinType.PinCategory="mask",PinType.PinSubCategory="alpha",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
            End Object
        `,
        color: Configuration.nodeColors.yellow,
        icon: false,
        pins: 6,
        pinName: ["Constant"],
        delegate: false,
        development: false,
        additionalTest://R=4.000000,G=10.500000,B=2500.669922,A=0.330000
            /** @param {import("../../js/element/NodeElement.js").default} node */
            node => {
                /** 
                 * @typedef {import("../../js/element/PinElement.js").default<LinearColorEntity>} LinearColorPinElement
                 * @typedef {import("../../js/element/InputElement.js").default} InputElement
                 */
                const r = 4.0
                const g = 10.5
                const b = 2500.669922
                const a = 0.33
                const constantPin = /** @type {LinearColorPinElement} */(node.querySelectorAll("ueb-pin")[0])
                expect(Utility.approximatelyEqual(constantPin.getDefaultValue().R, r)).to.be.true
                expect(Utility.approximatelyEqual(constantPin.getDefaultValue().G, g)).to.be.true
                expect(Utility.approximatelyEqual(constantPin.getDefaultValue().B, b)).to.be.true
                expect(Utility.approximatelyEqual(constantPin.getDefaultValue().A, a)).to.be.true
            }
    },
]

generateNodeTests(tests)
