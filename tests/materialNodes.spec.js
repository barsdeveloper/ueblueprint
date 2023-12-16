import Configuration from "../../js/Configuration.js"
import generateNodeTests from "../fixtures/testUtilities.js"
import IntegerEntity from "../../js/entity/IntegerEntity.js"
import NodeElement from "../../js/element/NodeElement.js"
import PinElement from "../../js/element/PinElement.js"
import RBSerializationVector2DEntity from "../../js/entity/RBSerializationVector2DEntity.js"
import Utility from "../../js/Utility.js"

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
        pinNames: ["Value"],
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
        pinNames: ["X", "Y"],
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
        pinNames: ["Constant"],
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
        pinNames: ["Constant"],
        delegate: false,
        development: false,
        additionalTest:
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
    {
        name: "Sqrt",
        value: String.raw`
            Begin Object Class=/Script/UnrealEd.MaterialGraphNode Name="MaterialGraphNode_24" ExportPath=/Script/UnrealEd.MaterialGraphNode'"/Engine/Transient.M_CobbleStone_Pebble:MaterialGraph_0.MaterialGraphNode_24"'
                Begin Object Class=/Script/Engine.MaterialExpressionSquareRoot Name="MaterialExpressionSquareRoot_0" ExportPath=/Script/Engine.MaterialExpressionSquareRoot'"/Engine/Transient.M_CobbleStone_Pebble:MaterialGraph_0.MaterialGraphNode_24.MaterialExpressionSquareRoot_0"'
                End Object
                Begin Object Name="MaterialExpressionSquareRoot_0" ExportPath=/Script/Engine.MaterialExpressionSquareRoot'"/Engine/Transient.M_CobbleStone_Pebble:MaterialGraph_0.MaterialGraphNode_24.MaterialExpressionSquareRoot_0"'
                    MaterialExpressionEditorX=-1552
                    MaterialExpressionEditorY=-416
                    MaterialExpressionGuid=3F37EEB301AE4B0192673A114358C546
                    Material=/Script/UnrealEd.PreviewMaterial'"/Engine/Transient.M_CobbleStone_Pebble"'
                    bCollapsed=False
                End Object
                MaterialExpression=/Script/Engine.MaterialExpressionSquareRoot'"MaterialExpressionSquareRoot_0"'
                NodePosX=-1552
                NodePosY=-416
                NodeGuid=5DB895BECADE486CB5F8A40B72C64637
                CustomProperties Pin (PinId=9BEA4A9DE7DE411EB9590041B6137505,PinName="Input",PinFriendlyName=NSLOCTEXT("MaterialGraphNode", "Space", " "),PinType.PinCategory="required",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
                CustomProperties Pin (PinId=4F7BCB72BB064C5FA9EDFC004EEF3591,PinName="Output",PinFriendlyName=NSLOCTEXT("MaterialGraphNode", "Space", " "),Direction="EGPD_Output",PinType.PinCategory="",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
            End Object
        `,
        color: Configuration.nodeColors.green,
        icon: false,
        pins: 2,
        pinNames: [],
        delegate: false,
        development: false,
    },
    {
        name: "Log10",
        value: String.raw`
            Begin Object Class=/Script/UnrealEd.MaterialGraphNode Name="MaterialGraphNode_26" ExportPath=/Script/UnrealEd.MaterialGraphNode'"/Engine/Transient.M_CobbleStone_Pebble:MaterialGraph_0.MaterialGraphNode_26"'
                Begin Object Class=/Script/Engine.MaterialExpressionLogarithm10 Name="MaterialExpressionLogarithm10_0" ExportPath=/Script/Engine.MaterialExpressionLogarithm10'"/Engine/Transient.M_CobbleStone_Pebble:MaterialGraph_0.MaterialGraphNode_26.MaterialExpressionLogarithm10_0"'
                End Object
                Begin Object Name="MaterialExpressionLogarithm10_0" ExportPath=/Script/Engine.MaterialExpressionLogarithm10'"/Engine/Transient.M_CobbleStone_Pebble:MaterialGraph_0.MaterialGraphNode_26.MaterialExpressionLogarithm10_0"'
                    MaterialExpressionEditorX=-1699
                    MaterialExpressionEditorY=-366
                    MaterialExpressionGuid=D6C0D0C0B1C241C7BC5CAE85C32A967E
                    Material=/Script/UnrealEd.PreviewMaterial'"/Engine/Transient.M_CobbleStone_Pebble"'
                End Object
                MaterialExpression=/Script/Engine.MaterialExpressionLogarithm10'"MaterialExpressionLogarithm10_0"'
                NodePosX=-1699
                NodePosY=-366
                NodeGuid=7432C0BB32F74D54B23EB5FFEB9D7255
                CustomProperties Pin (PinId=C3E922C93B644E5781F1C76FD70CA87D,PinName="X",PinType.PinCategory="required",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
                CustomProperties Pin (PinId=48EB102C92F74A7E817286C32A8D217A,PinName="Output",PinFriendlyName=NSLOCTEXT("MaterialGraphNode", "Space", " "),Direction="EGPD_Output",PinType.PinCategory="",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
            End Object
        `,
        color: Configuration.nodeColors.green,
        icon: false,
        pins: 2,
        pinNames: ["X"],
        delegate: false,
        development: false,
    },
    {
        name: "Log2",
        value: String.raw`
            Begin Object Class=/Script/UnrealEd.MaterialGraphNode Name="MaterialGraphNode_25" ExportPath=/Script/UnrealEd.MaterialGraphNode'"/Engine/Transient.M_CobbleStone_Pebble:MaterialGraph_0.MaterialGraphNode_25"'
                Begin Object Class=/Script/Engine.MaterialExpressionLogarithm2 Name="MaterialExpressionLogarithm2_0" ExportPath=/Script/Engine.MaterialExpressionLogarithm2'"/Engine/Transient.M_CobbleStone_Pebble:MaterialGraph_0.MaterialGraphNode_25.MaterialExpressionLogarithm2_0"'
                End Object
                Begin Object Name="MaterialExpressionLogarithm2_0" ExportPath=/Script/Engine.MaterialExpressionLogarithm2'"/Engine/Transient.M_CobbleStone_Pebble:MaterialGraph_0.MaterialGraphNode_25.MaterialExpressionLogarithm2_0"'
                    MaterialExpressionEditorX=-1343
                    MaterialExpressionEditorY=-380
                    MaterialExpressionGuid=DFB490DA67CD4FED91729623FA6F76F9
                    Material=/Script/UnrealEd.PreviewMaterial'"/Engine/Transient.M_CobbleStone_Pebble"'
                End Object
                MaterialExpression=/Script/Engine.MaterialExpressionLogarithm2'"MaterialExpressionLogarithm2_0"'
                NodePosX=-1343
                NodePosY=-380
                NodeGuid=C413E5EDE2484269AB5BB8E6E14FD5DC
                CustomProperties Pin (PinId=AA0DC6E48E864B2483F3F5239FDBC26D,PinName="X",PinType.PinCategory="required",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
                CustomProperties Pin (PinId=7E2CEF20073B4A8DBCA5AEAFBEA3BE0B,PinName="Output",PinFriendlyName=NSLOCTEXT("MaterialGraphNode", "Space", " "),Direction="EGPD_Output",PinType.PinCategory="",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
            End Object
        `,
        color: Configuration.nodeColors.green,
        icon: false,
        pins: 2,
        pinNames: ["X"],
        delegate: false,
        development: false,
    },
    {
        name: "Ln",
        value: String.raw`
            Begin Object Class=/Script/UnrealEd.MaterialGraphNode Name="MaterialGraphNode_27" ExportPath=/Script/UnrealEd.MaterialGraphNode'"/Engine/Transient.M_CobbleStone_Pebble:MaterialGraph_0.MaterialGraphNode_27"'
                Begin Object Class=/Script/InterchangeImport.MaterialExpressionLogarithm Name="MaterialExpressionLogarithm_0" ExportPath=/Script/InterchangeImport.MaterialExpressionLogarithm'"/Engine/Transient.M_CobbleStone_Pebble:MaterialGraph_0.MaterialGraphNode_27.MaterialExpressionLogarithm_0"'
                End Object
                Begin Object Name="MaterialExpressionLogarithm_0" ExportPath=/Script/InterchangeImport.MaterialExpressionLogarithm'"/Engine/Transient.M_CobbleStone_Pebble:MaterialGraph_0.MaterialGraphNode_27.MaterialExpressionLogarithm_0"'
                    MaterialExpressionEditorX=-1808
                    MaterialExpressionEditorY=-384
                    MaterialExpressionGuid=A88BE2DBB50544539F7C340F1C521570
                    Material=/Script/UnrealEd.PreviewMaterial'"/Engine/Transient.M_CobbleStone_Pebble"'
                End Object
                MaterialExpression=/Script/InterchangeImport.MaterialExpressionLogarithm'"MaterialExpressionLogarithm_0"'
                NodePosX=-1808
                NodePosY=-384
                NodeGuid=7BC7C5E93F8F47BAB3C0086F9C2AE036
                CustomProperties Pin (PinId=DCCD2C267163472C98FFD44B5AC004DD,PinName="Input",PinFriendlyName=NSLOCTEXT("MaterialGraphNode", "Space", " "),PinType.PinCategory="required",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
                CustomProperties Pin (PinId=D0ACD287FE494F0D8CB682DC7EABDD07,PinName="Output",PinFriendlyName=NSLOCTEXT("MaterialGraphNode", "Space", " "),Direction="EGPD_Output",PinType.PinCategory="",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
            End Object
        `,
        color: Configuration.nodeColors.green,
        icon: false,
        pins: 2,
        pinNames: [],
        delegate: false,
        development: false,
    },
    {
        name: "Texture Sample",
        value: String.raw`
            Begin Object Class=/Script/UnrealEd.MaterialGraphNode Name="MaterialGraphNode_11" ExportPath=/Script/UnrealEd.MaterialGraphNode'"/Engine/Transient.M_CobbleStone_Pebble:MaterialGraph_0.MaterialGraphNode_11"'
                Begin Object Class=/Script/Engine.MaterialExpressionTextureSample Name="MaterialExpressionTextureSample_8" ExportPath=/Script/Engine.MaterialExpressionTextureSample'"/Engine/Transient.M_CobbleStone_Pebble:MaterialGraph_0.MaterialGraphNode_11.MaterialExpressionTextureSample_8"'
                End Object
                Begin Object Name="MaterialExpressionTextureSample_8" ExportPath=/Script/Engine.MaterialExpressionTextureSample'"/Engine/Transient.M_CobbleStone_Pebble:MaterialGraph_0.MaterialGraphNode_11.MaterialExpressionTextureSample_8"'
                    Coordinates=(Expression=/Script/Engine.MaterialExpressionMultiply'"MaterialExpressionMultiply_12"')
                    Texture=/Script/Engine.Texture2D'"/Game/StarterContent/Textures/T_MacroVariation.T_MacroVariation"'
                    MaterialExpressionEditorX=-1056
                    MaterialExpressionEditorY=-1392
                    MaterialExpressionGuid=8A9B66F54B20419B8A09B9A31EEE0326
                    Material=/Script/UnrealEd.PreviewMaterial'"/Engine/Transient.M_CobbleStone_Pebble"'
                End Object
                MaterialExpression=/Script/Engine.MaterialExpressionTextureSample'"MaterialExpressionTextureSample_8"'
                NodePosX=-1056
                NodePosY=-1392
                AdvancedPinDisplay=Shown
                NodeGuid=ABB48A5BD2DD43FFA097F233839224B4
                CustomProperties Pin (PinId=57F9CF0C528346ACBF859D991A2977C8,PinName="UVs",PinType.PinCategory="optional",PinType.PinSubCategory="byte",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,DefaultValue="0",LinkedTo=(MaterialGraphNode_13 103847E51C494723BAC2A040FB53291F,),PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
                CustomProperties Pin (PinId=04074338E0FB457FB39F2F8737202A9D,PinName="Tex",PinType.PinCategory="optional",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
                CustomProperties Pin (PinId=B6216A82E662464E9547EAF8F7C9156B,PinName="Apply View MipBias",PinType.PinCategory="optional",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
                CustomProperties Pin (PinId=86F88FBB9F4744ABAF530B1699FD5C45,PinName="MipValueMode",PinType.PinCategory="optional",PinType.PinSubCategory="byte",PinType.PinSubCategoryObject=/Script/CoreUObject.Enum'"/Script/Engine.ETextureMipValueMode"',PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,DefaultValue="None (use computed mip level)",PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=True,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=True,bOrphanedPin=False,)
                CustomProperties Pin (PinId=F971048A6287441491B3F431F9204643,PinName="Sampler Source",PinType.PinCategory="optional",PinType.PinSubCategory="byte",PinType.PinSubCategoryObject=/Script/CoreUObject.Enum'"/Script/Engine.ESamplerSourceMode"',PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,DefaultValue="From texture asset",PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=True,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=True,bOrphanedPin=False,)
                CustomProperties Pin (PinId=57AE297DD9B641D49F96DE01DE60352D,PinName="Sampler Type",PinType.PinCategory="optional",PinType.PinSubCategory="byte",PinType.PinSubCategoryObject=/Script/CoreUObject.Enum'"/Script/Engine.EMaterialSamplerType"',PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,DefaultValue="Color",PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=True,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=True,bOrphanedPin=False,)
                CustomProperties Pin (PinId=5EB251794C274FE29D545A848C25061A,PinName="RGB",Direction="EGPD_Output",PinType.PinCategory="mask",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
                CustomProperties Pin (PinId=22B624FB96F2457AB5199C9AC8D6FED7,PinName="R",Direction="EGPD_Output",PinType.PinCategory="mask",PinType.PinSubCategory="red",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,LinkedTo=(MaterialGraphNode_14 F0018EB452FE4F1C8A7A713AB4FBB4BA,),PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
                CustomProperties Pin (PinId=0193BCA3C4A04EA3B71604FC23D817AB,PinName="G",Direction="EGPD_Output",PinType.PinCategory="mask",PinType.PinSubCategory="green",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
                CustomProperties Pin (PinId=3105CB21DB34441582786D8B5FCB9B5E,PinName="B",Direction="EGPD_Output",PinType.PinCategory="mask",PinType.PinSubCategory="blue",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
                CustomProperties Pin (PinId=057FD07998624E67B613294C0E91FDB0,PinName="A",Direction="EGPD_Output",PinType.PinCategory="mask",PinType.PinSubCategory="alpha",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
                CustomProperties Pin (PinId=168889DC9D5D4F22B2F581DB425812EA,PinName="RGBA",Direction="EGPD_Output",PinType.PinCategory="mask",PinType.PinSubCategory="rgba",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
            End Object
        `,
        color: Configuration.nodeColors.darkBlue,
        icon: false,
        pins: 12,
        pinNames: [
            "UVs",
            "Tex",
            "Apply View Mip Bias",
            "Mip Value Mode",
            "Sampler Source",
            "Sampler Type",
            "RGB",
            "R",
            "G",
            "B",
            "A",
            "RGBA"
        ],
        delegate: false,
        development: false,
        additionalTest:
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
    {
        name: "Temporal Sobol",
        value: String.raw`
            Begin Object Class=/Script/UnrealEd.MaterialGraphNode Name="MaterialGraphNode_9" ExportPath=/Script/UnrealEd.MaterialGraphNode'"/Engine/Transient.NewMaterial:MaterialGraph_0.MaterialGraphNode_9"'
                Begin Object Class=/Script/Engine.MaterialExpressionTemporalSobol Name="MaterialExpressionTemporalSobol_0" ExportPath=/Script/Engine.MaterialExpressionTemporalSobol'"/Engine/Transient.NewMaterial:MaterialGraph_0.MaterialGraphNode_9.MaterialExpressionTemporalSobol_0"'
                End Object
                Begin Object Name="MaterialExpressionTemporalSobol_0" ExportPath=/Script/Engine.MaterialExpressionTemporalSobol'"/Engine/Transient.NewMaterial:MaterialGraph_0.MaterialGraphNode_9.MaterialExpressionTemporalSobol_0"'
                    "ConstIndex"=4
                    "ConstSeed"=(X=77.000000,Y=55.000000)
                    "MaterialExpressionEditorX"=-345
                    "MaterialExpressionEditorY"=225
                    "MaterialExpressionGuid"=D1A3B12340EE27538A3109B7B3D0E119
                    "Material"=/Script/UnrealEd.PreviewMaterial'"/Engine/Transient.NewMaterial"'
                End Object
                "MaterialExpression"=/Script/Engine.MaterialExpressionTemporalSobol'"MaterialExpressionTemporalSobol_0"'
                "NodePosX"=-345
                "NodePosY"=225
                "NodeGuid"=5BE5108B48EB26B6366D4DA6AF99285D
                CustomProperties Pin (PinId=E9B08066434FD243EF8856B11A08588D,PinName="Index",PinType.PinCategory="optional",PinType.PinSubCategory="int",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,DefaultValue="4",PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
                CustomProperties Pin (PinId=4EB376FB4105AA0CFA52D990C82FE284,PinName="Seed",PinType.PinCategory="optional",PinType.PinSubCategory="rg",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,DefaultValue="X=77.000 Y=55.000",PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
                CustomProperties Pin (PinId=4A57DE0448EEA04661E83AA561BE2D94,PinName="Output",PinFriendlyName=NSLOCTEXT("MaterialGraphNode", "Space", " "),Direction="EGPD_Output",PinType.PinCategory="",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
            End Object
        `,
        color: Configuration.nodeColors.green,
        icon: false,
        pins: 3,
        pinNames: [
            "Index",
            "Seed"
        ],
        delegate: false,
        development: false,
        additionalTest:
            /** @param {NodeElement} node */
            node => {
                const indexPin = /** @type {PinElement<IntegerEntity>} */(node.querySelectorAll("ueb-pin")[0])
                const seedPin = /** @type {PinElement<RBSerializationVector2DEntity>} */(node.querySelectorAll("ueb-pin")[1])
                expect(indexPin.getDefaultValue().value).to.be.equal(4)
                expect(seedPin.getDefaultValue().X).to.be.equal(77)
                expect(seedPin.getDefaultValue().Y).to.be.equal(55)
            }
    },
]

generateNodeTests(tests)
