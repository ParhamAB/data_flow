import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import { Text } from "../../../utils/widgets/widgets";
import { useDispatch, useSelector } from "react-redux";
import { getRandomColor, persianDigits } from "../../../utils/utils";
import Tree from "react-d3-tree";
import { getEventNodeListFunction } from "../../../redux/events_screen/get_node_events_redux/get_node_events_action";
import { useParams } from "react-router-dom";
import Theme from "../../../theme/theme";
import Modal from "react-modal";
import { TagCloud } from "react-tagcloud";

function ViewEventNodeScreen() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const eventNodeList = useSelector((state) => state.eventNodeListState);
  const [tree, setTree] = useState({});

  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [wordCloud, setWordCloud] = useState([]);
  const [noteList, setNoteList] = useState([]);

  useEffect(() => {
    dispatch(getEventNodeListFunction(id));
    // eslint-disable-next-line
  }, []);

  function createNestedObject(list, id) {
    const result = { name: id };
    const children = list.filter((item) => item.id_root === id);

    if (children.length > 0) {
      result.children = children.map((child) =>
        createNestedObject(list, child.id_cluster)
      );
    }

    return result;
  }

  useEffect(() => {
    setTree({});
    if (eventNodeList.eventNodeList && eventNodeList.eventNodeList[0]) {
      eventNodeList.eventNodeList.sort((a, b) => a.id_cluster - b.id_cluster);
      setTree(
        createNestedObject(
          eventNodeList.eventNodeList.sort(
            (a, b) => a.id_cluster - b.id_cluster
          ),
          eventNodeList.eventNodeList.sort(
            (a, b) => a.id_cluster - b.id_cluster
          )[0].id_cluster
        )
      );
    }
    // eslint-disable-next-line
  }, [eventNodeList.eventNodeList]);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const customStyles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "#31313180",
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      background: Theme.backGroundColorGrey,
      border: "0px solid #ccc",
      WebkitOverflowScrolling: "touch",
      borderRadius: "15px",
      outline: "none",
      padding: "25px",
    },
  };

  return (
    <Container>
      <Text
        text={"نمایش سلسله مراتبی رویداد ها"}
        fontSize="20px"
        fontWeight={700}
      ></Text>
      <NodeContainer>
        <Tree
          data={tree}
          enableLegacyTransitions
          centeringTransitionDuration={300}
          collapsible={false}
          rootNodeClassName="node__root"
          branchNodeClassName="node__branch"
          leafNodeClassName="node__leaf"
          onNodeClick={(node, event) => {
            setNoteList([]);
            let temp = [];
            let key = Object.keys(
              eventNodeList.eventNodeList.filter(
                (item) => item.id_cluster === node.data.name
              )[0].candidate
            );
            let value = Object.values(
              eventNodeList.eventNodeList.filter(
                (item) => item.id_cluster === node.data.name
              )[0].candidate
            );
            key.map((e, index) => {
              temp.push({
                value: e,
                count: value[index],
              });
            });
            eventNodeList.eventNodeList
              .filter((item) => item.id_cluster === node.data.name)[0]
              .representative_documents.map((e) => {
                setNoteList((oldArray) => [...oldArray, e]);
              });
            setWordCloud(temp);
            openModal();
          }}
        />
      </NodeContainer>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <InsideBox>
          <Title>{"مشخصات پیام"}</Title>
          <WordCloud>
            <TagCloud
              minSize={12}
              maxSize={35}
              tags={wordCloud}
              className="wordCloud"
            />
          </WordCloud>
          <Title>{"پیام های مرتبط :"}</Title>
          <NoteContainer>
            {noteList
              ? noteList.map((e) => {
                  return (
                    <PmContainerEach>
                      <Divider color={getRandomColor()}></Divider>
                      {e}
                    </PmContainerEach>
                  );
                })
              : null}
          </NoteContainer>
        </InsideBox>
      </Modal>
    </Container>
  );
}

export default ViewEventNodeScreen;

const Container = styled.div`
  /* height: calc(100% - 250px); */
  max-height: calc(100vh - 90px);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding-inline: 40px;
  padding-top: 10px;
  overflow-y: auto;
`;

const NodeContainer = styled.div`
  width: 100% !important;
  height: 90vh !important;
  color: ${Theme.fontColor} !important;

  .node__root > circle {
    fill: crimson;
    r: 50;
  }
  .node__root > text {
    color: white;
  }

  .node__branch > circle {
    fill: skyblue;
    r: 50;
  }

  .node__branch > text {
    fill: white;
  }

  .node__leaf > circle {
    fill: green;
    width: 150px;
    height: 80px;
    /* Let's also make the radius of leaf nodes larger */
    r: 50;
  }

  .node__leaf > text {
    color: white;
  }
`;

const InsideBox = styled.div`
  min-width: 300px;
  max-width: 80vw;
  height: fit-content;
  max-height: 80vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  direction: rtl;
`;

const WordCloud = styled.div`
  width: calc(80%);
  max-width: 500px;
  height: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NoteContainer = styled.div`
  width: calc(100%);
  height: max-content;
  margin-top: 25px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const PmContainerEach = styled.div`
  width: calc(100%);
  height: max-content;
  border-radius: ${Theme.textFieldBorderRadius};
  background-color: ${Theme.backGroundColorGreyLight};
  margin-block: 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding-inline: 15px;
  padding-block: 10px;
  color: white;
`;

const Divider = styled.div`
  width: 10px;
  height: 70px;
  border-radius: 15px;
  background-color: ${(props) => props.color};
  margin-left: 10px;
`;

const Title = styled.div`
  width: calc(100%);
  height: 80px;
  color: ${Theme.fontColor};
  font-size: 25px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-block: 20px;
`;
