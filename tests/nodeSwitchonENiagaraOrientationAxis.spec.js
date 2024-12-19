import Configuration from "../js/Configuration.js"
import SVGIcon from "../js/SVGIcon.js"
import { testNode } from "./fixtures/test.js"

testNode({
    name: "Switch on ENiagaraOrientationAxis",
    value: String.raw`
        Begin Object Class=/Script/BlueprintGraph.K2Node_SwitchEnum Name="K2Node_SwitchEnum_3"
            Enum=/Script/Engine.UserDefinedEnum'"/Niagara/Enums/ENiagaraOrientationAxis.ENiagaraOrientationAxis"'
            EnumEntries(0)="NewEnumerator0"
            EnumEntries(1)="NewEnumerator1"
            EnumEntries(2)="NewEnumerator2"
            NodePosX=128
            NodePosY=272
            NodeGuid=27ECE312F8464337AAFD3E4710FD0108
            CustomProperties Pin (PinId=D9D55819354041FCA1749D111E98462F,PinName="execute",PinType.PinCategory="exec",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
            CustomProperties Pin (PinId=A34A643489CB4A9A8AB8EF406E66E586,PinName="Selection",PinType.PinCategory="byte",PinType.PinSubCategory="",PinType.PinSubCategoryObject=/Script/Engine.UserDefinedEnum'"/Niagara/Enums/ENiagaraOrientationAxis.ENiagaraOrientationAxis"',PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,DefaultValue="NewEnumerator0",PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
            CustomProperties Pin (PinId=E28F973F53654172AA58FEB665826457,PinName="NotEqual_ByteByte",PinType.PinCategory="object",PinType.PinSubCategory="",PinType.PinSubCategoryObject=/Script/CoreUObject.Class'"/Script/Engine.KismetMathLibrary"',PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,DefaultObject="/Script/Engine.Default__KismetMathLibrary",PersistentGuid=00000000000000000000000000000000,bHidden=True,bNotConnectable=True,bDefaultValueIsReadOnly=True,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
            CustomProperties Pin (PinId=02E2659FDD834A9483316C112630A17C,PinName="NewEnumerator0",PinFriendlyName=NSLOCTEXT("[9C9868C74FCF3E7AFDEB778F8C9EA988]", "1CE439C14E8741B2E94E4896C5BB29BB", "X Axis"),Direction="EGPD_Output",PinType.PinCategory="exec",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
            CustomProperties Pin (PinId=36E317D2BD3C48A7BED78FFE25AD1451,PinName="NewEnumerator1",PinFriendlyName=NSLOCTEXT("[9C9868C74FCF3E7AFDEB778F8C9EA988]", "4807FD384418AD133AF56D9DD063A9D8", "Y Axis"),Direction="EGPD_Output",PinType.PinCategory="exec",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
            CustomProperties Pin (PinId=2020E66C887C446DB4B69B0CA9652A6A,PinName="NewEnumerator2",PinFriendlyName=NSLOCTEXT("[9C9868C74FCF3E7AFDEB778F8C9EA988]", "0D8EE448409B4A8CD1F47FAB0AC122CF", "Z Axis"),Direction="EGPD_Output",PinType.PinCategory="exec",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
        End Object
    `,
    size: [20, 8],
    color: Configuration.nodeColors.lime,
    icon: SVGIcon.switch,
    pins: 5,
    pinNames: ["Selection", "X Axis", "Y Axis", "Z Axis"],
    delegate: false,
    development: false,
})
