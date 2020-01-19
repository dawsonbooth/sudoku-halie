import React from "react";
import { Button, Icon } from "@ui-kitten/components";

interface PropTypes {
    onPress: () => void;
}

const PencilIcon = style => <Icon {...style} name="edit" />;

export default function NewGameButton({ onPress }: PropTypes) {
    return <Button appearance="ghost" onPress={onPress} icon={PencilIcon} />;
}
