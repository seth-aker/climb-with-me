import { Screen } from "app/components";
import { HomeTabScreenProps } from "app/navigators";
import { observer } from "mobx-react-lite";
import React, { FC } from "react";

interface NewClimbScreenProps extends HomeTabScreenProps<"NewClimb"> {
}

export const NewClimbScreen: FC<NewClimbScreenProps> = observer(function NewClimbScreen(_props) {
    return (
        <Screen>

        </Screen>
    )
})
