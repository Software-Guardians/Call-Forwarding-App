use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug, Clone, PartialEq)]
#[serde(tag = "type", content = "payload")]
pub enum ProtocolMessage {
    #[serde(rename = "CALL_STATE")]
    CallState(CallStatePayload),
    #[serde(rename = "COMMAND")]
    Command(CommandPayload),
    #[serde(rename = "GET_CONTACTS")]
    GetContacts(GetContactsPayload),
    #[serde(rename = "CONTACTS_DATA")]
    ContactsData(ContactsDataPayload),
    #[serde(rename = "HEARTBEAT")]
    Heartbeat(HeartbeatPayload),
}

#[derive(Serialize, Deserialize, Debug, Clone, PartialEq)]
pub struct CallStatePayload {
    pub state: String, // IDLE, RINGING, ACTIVE
    #[serde(skip_serializing_if = "Option::is_none")]
    pub number: Option<String>,
}

#[derive(Serialize, Deserialize, Debug, Clone, PartialEq)]
pub struct CommandPayload {
    pub action: String, // ANSWER, REJECT, END, DIAL
    #[serde(skip_serializing_if = "Option::is_none")]
    pub number: Option<String>,
}

#[derive(Serialize, Deserialize, Debug, Clone, PartialEq)]
pub struct GetContactsPayload {
    pub action: String, // GET_CONTACTS
}

#[derive(Serialize, Deserialize, Debug, Clone, PartialEq)]
pub struct ContactsDataPayload {
    pub contacts: Vec<Contact>,
}

#[derive(Serialize, Deserialize, Debug, Clone, PartialEq)]
pub struct Contact {
    pub name: String,
    #[serde(rename = "phoneNumber")]
    pub phone_number: String,
}

#[derive(Serialize, Deserialize, Debug, Clone, PartialEq)]
pub struct HeartbeatPayload {}

#[cfg(test)]
mod tests {
    use super::*;
    use serde_json::json;

    #[test]
    fn test_serialize_command_answer() {
        let msg = ProtocolMessage::Command(CommandPayload {
            action: "ANSWER".to_string(),
            number: None,
        });
        let json = serde_json::to_string(&msg).unwrap();
        let expected = json!({
            "type": "COMMAND",
            "payload": {
                "action": "ANSWER"
            }
        });
        assert_eq!(
            serde_json::from_str::<serde_json::Value>(&json).unwrap(),
            expected
        );
    }

    #[test]
    fn test_deserialize_call_state() {
        let json = json!({
            "type": "CALL_STATE",
            "payload": {
                "state": "RINGING",
                "number": "+123456"
            }
        });
        let msg: ProtocolMessage = serde_json::from_value(json).unwrap();
        match msg {
            ProtocolMessage::CallState(payload) => {
                assert_eq!(payload.state, "RINGING");
                assert_eq!(payload.number, Some("+123456".to_string()));
            }
            _ => panic!("Wrong message type"),
        }
    }
}
