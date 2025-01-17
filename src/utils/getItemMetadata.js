// normal items
import Text from "../items/Text";
import Video from "../items/Video";
import YouTube from "../items/YouTube";
import Document from "../items/Document";
import Image from "../items/Image";
import SingleSelect from "../items/SingleSelect";
import MultiSelect from "../items/MultiSelect";
import LongText from "../items/LongText";
import ShortText from "../items/ShortText";

// editable items
import EditableText from "../editableItems/EditableText";
import EditableVideo from "../editableItems/EditableVideo";
import EditableYouTube from "../editableItems/EditableYouTube";
import EditableDocument from "../editableItems/EditableDocument";
import EditableImage from "../editableItems/EditableImage";
import EditableSingleSelect from "../editableItems/EditableSingleSelect";
import EditableMultiSelect from "../editableItems/EditableMultiSelect";
import EditableLongText from "../editableItems/EditableLongText";
import EditableShortText from "../editableItems/EditableShortText";

import { getItemIcon } from "../components/Icons";

export default function getItemMetadata(item, editable) {
  let helperText;
  let Component;
  let icon = getItemIcon(item.type);

  switch (item.type) {
    case "Text":
      helperText = null;
      Component = editable ? EditableText : Text;
      break;
    case "Video":
      helperText = null;
      Component = editable ? EditableVideo : Video;
      break;
    case "YouTube":
      helperText = null;
      Component = editable ? EditableYouTube : YouTube;
      break;
    case "Document":
      helperText = null;
      Component = editable ? EditableDocument : Document;
      break;
    case "Image":
      helperText = null;
      Component = editable ? EditableImage : Image;
      break;
    case "SingleSelect":
      helperText = "Select only one";
      Component = editable ? EditableSingleSelect : SingleSelect;
      break;
    case "MultiSelect":
      helperText = "Check all that apply";
      Component = editable ? EditableMultiSelect : MultiSelect;
      break;
    case "LongText":
      helperText = "Type your answer";
      Component = editable ? EditableLongText : LongText;
      break;
    case "ShortText":
    case "TextInput": // legacy support
      helperText = "Type your answer";
      Component = editable ? EditableShortText : ShortText;
      break;
    default:
      helperText = null;
      Component = null;
  }

  return { Component, helperText, icon };
}
