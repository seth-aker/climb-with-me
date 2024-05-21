import React from "react";
import { ListView, ListViewProps } from "./ListView";
import { ListItem } from "./ListItem";
export interface DropDownItem {
    value: string,
}

interface DropDownPickerProps extends ListViewProps<DropDownItem> {
    isOpen: boolean,
    handleItemSelected: () => void,
    handeTogglePicker: () => void,
    selectedItem: DropDownItem
}

export function DropDownPicker(props: DropDownPickerProps) {
    const { data, isOpen, handleItemSelected, handeTogglePicker, selectedItem } = props
    const selectedItemData = [selectedItem];
    
    return (
        isOpen ? (
            <ListView
                data={data}
                renderItem={({ item }) => <ListItem 
                                            text={item.value} 
                                            onPress={handleItemSelected} 
                                            rightIcon={ item.value === selectedItem.value ? "check" : undefined}
                                            /> } 
            />
        ) : (
            <ListView  
                data={selectedItemData}
                renderItem={({ item }) => <ListItem 
                                            text={item.value} 
                                            onPress={handeTogglePicker} 
                                            rightIcon="caret-down"
                                            />}
            />
        )
    )
}