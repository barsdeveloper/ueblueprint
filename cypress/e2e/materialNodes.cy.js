/// <reference types="cypress" />

import generateNodeTests from "../fixtures/testUtilities.js"
import Configuration from "../../js/Configuration.js"

const tests = [
    {
        name: "1.13e+14,0",
        value: String.raw`
            Begin Object Class=/Script/UnrealEd.MaterialGraphNode Name="MaterialGraphNode_22"
                Begin Object Class=/Script/Engine.MaterialExpressionConstant2Vector Name="MaterialExpressionConstant2Vector_0"
                End Object
                Begin Object Name="MaterialExpressionConstant2Vector_0"
                    R=313213107306496.000000
                    MaterialExpressionEditorX=-2208
                    MaterialExpressionEditorY=-1072
                    MaterialExpressionGuid=A9605277916E4C64B0DAF6ADEBF312A6
                    Material=/Script/UnrealEd.PreviewMaterial'"/Engine/Transient.M_CobbleStone_Pebble"'
                End Object
                MaterialExpression=/Script/Engine.MaterialExpressionConstant2Vector'"MaterialExpressionConstant2Vector_0"'
                NodePosX=-2208
                NodePosY=-1072
                NodeGuid=287700BEECBE4FF98F47394337B10A51
                CustomProperties Pin (PinId=A5E99A21F6214E22845DE6FE673F1E0C,PinName="X",PinType.PinCategory="optional",PinType.PinSubCategory="red",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,DefaultValue="313213107306496.0",PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=True,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
                CustomProperties Pin (PinId=8038D6C855844EF6854E33B12592F287,PinName="Y",PinType.PinCategory="optional",PinType.PinSubCategory="red",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,DefaultValue="0.0",PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=True,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
                CustomProperties Pin (PinId=F0ABD57F7F22490D96D86245449F67C5,PinName="Output",PinFriendlyName=NSLOCTEXT("MaterialGraphNode", "Space", " "),Direction="EGPD_Output",PinType.PinCategory="mask",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
                CustomProperties Pin (PinId=FC6CF9B376184D2091DFB4B6DC66769F,PinName="Output2",PinFriendlyName=NSLOCTEXT("MaterialGraphNode", "Space", " "),Direction="EGPD_Output",PinType.PinCategory="mask",PinType.PinSubCategory="red",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
                CustomProperties Pin (PinId=B0C4B417692647C5B455F6108AC55181,PinName="Output3",PinFriendlyName=NSLOCTEXT("MaterialGraphNode", "Space", " "),Direction="EGPD_Output",PinType.PinCategory="mask",PinType.PinSubCategory="green",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
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
                /** @typedef {import("../../js/element/PinElement.js").default} PinElement */
                expect(/** @type {PinElement} */(node.querySelectorAll("ueb-pin")[3]).getColor())
                    .to.deep.equal(Configuration.pinColor.red)
                expect(/** @type {PinElement} */(node.querySelectorAll("ueb-pin")[4]).getColor())
                    .to.deep.equal(Configuration.pinColor.green)
            }
    },
]

generateNodeTests(tests)
