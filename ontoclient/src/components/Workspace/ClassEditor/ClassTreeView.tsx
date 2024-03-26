import React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
// import Label from "@mui/icons-material/Label";
import TripOriginIcon from "@mui/icons-material/TripOrigin";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { SvgIconProps } from "@mui/material/SvgIcon";
import { TreeView } from "@mui/x-tree-view/TreeView";
import {
    TreeItem,
    TreeItemProps,
    treeItemClasses,
} from "@mui/x-tree-view/TreeItem";
import { IClass } from "../../../models/IClass";

interface IClassTreeViewProps {
    classes: IClass[];
    onChangeSelectedNode: (selecteClass: IClass) => void;
}

const ClassTreeView: React.FC<IClassTreeViewProps> = (props) => {
    const renderTree = (
        classes: IClass[],
        parentClassId: number | null
    ): React.ReactNode => {
        return classes
            .filter((cls) => cls.parentClassId === parentClassId)
            .map((cls) => (
                <StyledTreeItem
                    nodeId={cls.id.toString()}
                    labelText={cls.name}
                    labelIcon={TripOriginIcon}
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
            onNodeSelect={(event, nodeId) =>
                props.onChangeSelectedNode(
                    props.classes.filter(
                        (selectClass) => selectClass.id.toString() == nodeId
                    )[0]
                )
            }
            sx={{ height: "100%", flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
        >
            {renderTree(props.classes, null)}
        </TreeView>
    );
};

export default ClassTreeView;

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
                    <Box
                        component={LabelIcon}
                        color="#8da9cc"
                        sx={{ mr: 1}}
                    />
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
