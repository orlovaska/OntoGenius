import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
// import Label from "@mui/icons-material/Label";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { SvgIconProps, SvgIconTypeMap } from "@mui/material/SvgIcon";
import { TreeView } from "@mui/x-tree-view/TreeView";
import {
    TreeItem,
    TreeItemProps,
    treeItemClasses,
} from "@mui/x-tree-view/TreeItem";
import { IClass } from "../../models/IClass";
import ClassService from "../../services/ClassService";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { Label } from "@mui/icons-material";

interface IBaseTreeViewProps {
    // ontologyId: number;
    svgIcon: OverridableComponent<SvgIconTypeMap>
}

const BaseTreeView: React.FC<IBaseTreeViewProps> = (props) => {
    const [classes, setClasses] = React.useState<IClass[]>([]);
    let selectNodeId: number[] = [];

    const selectNode = (nodeIds: string[]) => {

        // selectNodeId = nodeIds.map((id) => id as number)
        selectNodeId = nodeIds.map((id) => parseInt(id, 10));
        console.log("nodeIds: ", nodeIds);
    };

    const renderTree = (
        classes: IClass[],
        parentClassId: number | null
    ): React.ReactNode => {
        // console.log("renderTree id: ", parentClassId);
        // console.log("classes: ", classes);

        return classes
            .filter((cls) => cls.parentClassId === parentClassId)
            .map((cls) => (
                <StyledTreeItem
                    nodeId={cls.id.toString()}
                    labelText={cls.name}
                    labelIcon={Label}
                    key={cls.id}
                >
                    {renderTree(classes, cls.id)}
                </StyledTreeItem>
            ));
    };

    return (
        <TreeView
            defaultCollapseIcon={<ArrowDropDownIcon />}
            defaultExpandIcon={<ArrowRightIcon />}
            defaultEndIcon={<div style={{ width: 24 }} />}
            // multiSelect={true}
            // selected={selectNodeId.toString()}
            onNodeSelect={(event, nodeIds) => selectNode([nodeIds])}
            sx={{ height: 264, flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
        >
            {renderTree(classes, null)}
        </TreeView>
    );
};

export default BaseTreeView;

declare module "react" {
    interface CSSProperties {
        "--tree-view-color"?: string;
        "--tree-view-bg-color"?: string;
    }
}

type StyledTreeItemProps = TreeItemProps & {
    bgColor?: string;
    bgColorForDarkMode?: string;
    color?: string;
    colorForDarkMode?: string;
    labelIcon: React.ElementType<SvgIconProps>;
    labelInfo?: string;
    labelText: string;
};

const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
    color: theme.palette.text.secondary,
    [`& .${treeItemClasses.content}`]: {
        color: theme.palette.text.secondary,
        borderTopRightRadius: theme.spacing(2),
        borderBottomRightRadius: theme.spacing(2),
        paddingRight: theme.spacing(1),
        fontWeight: theme.typography.fontWeightMedium,
        "&.Mui-expanded": {
            fontWeight: theme.typography.fontWeightRegular,
        },
        "&:hover": {
            backgroundColor: theme.palette.action.hover,
        },
        "&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused": {
            backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
            color: "var(--tree-view-color)",
        },
        [`& .${treeItemClasses.label}`]: {
            fontWeight: "inherit",
            color: "inherit",
        },
    },
    // [`& .${treeItemClasses.group}`]: {
    //     marginLeft: 0,
    //     [`& .${treeItemClasses.content}`]: {
    //       // marginLeft: 10,
    //         paddingLeft: theme.spacing(2*treeItemClasses.),
    //     },
    // },
})) as unknown as typeof TreeItem;

const StyledTreeItem = React.forwardRef(function StyledTreeItem(
    props: StyledTreeItemProps,
    ref: React.Ref<HTMLLIElement>
) {
    const theme = useTheme();
    const {
        bgColor,
        color,
        labelIcon: LabelIcon,
        labelInfo,
        labelText,
        colorForDarkMode,
        bgColorForDarkMode,
        ...other
    } = props;

    const styleProps = {
        "--tree-view-color":
            theme.palette.mode !== "dark" ? color : colorForDarkMode,
        "--tree-view-bg-color":
            theme.palette.mode !== "dark" ? bgColor : bgColorForDarkMode,
    };

    return (
        <StyledTreeItemRoot
            label={
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        p: 0.5,
                        pr: 0,
                    }}
                >
                    <Box component={LabelIcon} color="inherit" sx={{ mr: 1 }} />
                    <Typography
                        variant="body2"
                        sx={{ fontWeight: "inherit", flexGrow: 1 }}
                    >
                        {labelText}
                    </Typography>
                    <Typography variant="caption" color="inherit">
                        {labelInfo}
                    </Typography>
                </Box>
            }
            style={styleProps}
            {...other}
            ref={ref}
        />
    );
});
