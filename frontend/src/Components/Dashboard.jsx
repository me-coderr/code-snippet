import {
  Spinner,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Dashboard = ({ isOpen }) => {
  const SERVER_URL = "http://localhost:3100";
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const modifyDate = (date) => {
    let newDate = date.substring(0, 10) + " " + date.substring(11, 19);
    return newDate;
  };

  const reloadData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${SERVER_URL}/api/snippets/`);
      setData(response.data);
      setIsLoading(false);
    } catch (err) {
      console.log(`\nError in axios post : ${err}\n`);
      throw err;
    }
  };

  useEffect(() => {
    if (isOpen) {
      reloadData();
    }
  }, [isOpen]);
  return (
    <>
      {isLoading ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </div>
      ) : (
        <TableContainer>
          <Table variant="simple">
            <TableCaption>Code Snippets</TableCaption>
            <Thead>
              <Tr>
                <Th>Username</Th>
                <Th>Language</Th>
                <Th>Std Input</Th>
                <Th>Code</Th>
                <Th>Created At</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data &&
                data.map((row) => {
                  const codeWithLineBreaks = (
                    row.source_code.length > 100
                      ? row.source_code.substring(0, 100)
                      : row.source_code
                  ).replace(/\n/g, "<br>");
                  return (
                    <Tr key={row.id}>
                      <Td>{row.username}</Td>
                      <Td>{row.code_language}</Td>
                      <Td
                        className="stdin"
                        maxHeight={"200px"}
                        maxWidth={"200px"}
                        overflowY={"scroll"}
                        overflowX={"scroll"}
                      >
                        {!row.stdin
                          ? "NULL"
                          : row.stdin.length > 100
                          ? row.stdin.substring(0, 100)
                          : row.stdin}
                      </Td>
                      <Td
                        maxHeight={"200px"}
                        maxWidth={"200px"}
                        overflowY={"scroll"}
                        overflowX={"scroll"}
                        dangerouslySetInnerHTML={{ __html: codeWithLineBreaks }}
                      ></Td>
                      <Td>{modifyDate(row.created_at)}</Td>
                    </Tr>
                  );
                })}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default Dashboard;
