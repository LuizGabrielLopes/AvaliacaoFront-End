"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Pagination, Modal, Card, Skeleton } from "antd";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import {
  getSessionStorage,
  setSessionStorage,
} from "../../utils/sessionStorage";
import styles from "./Ferramentas.module.css";

const HEADERS = { "x-api-key": process.env.NEXT_PUBLIC_API_KEY };

export default function Ferramentas() {
  const [data, setData] = useState({
    equipamentos: [],
    loading: true,
    current: 1,
    pageSize: 0,
  });

  const [modalInfo, setModalInfo] = useState({
    visible: false,
    equipamento: null,
    manutencao: null,
    loading: false,
  });

  useEffect(() => {
    const fetchEquipamentos = async () => {
      const cached = getSessionStorage("equipamentosData", []);
      if (cached.length > 0) {
        setData({ equipamentos: cached, loading: false, current: 1, pageSize: 5 });
        return;
      }

      try {
        const { data: equipamentos } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/equipamentos`,
          {
            headers: HEADERS,
          }
        );
        setSessionStorage("equipamentosData", equipamentos);
        setData({ equipamentos, loading: false, current: 1, pageSize: 5 });
      } catch {
        toast.error("Erro ao carregar equipamentos");
        setData((d) => ({ ...d, loading: false }));
      }
    };

    fetchEquipamentos();
  }, []);

  const openModal = async (equipamento) => {
    setModalInfo({ visible: true, equipamento, manutencao: null, loading: true });

    const cacheKey = `manutencao_${equipamento.id}`;
    const cached = getSessionStorage(cacheKey, null);
    if (cached) {
      setModalInfo((m) => ({ ...m, manutencao: cached, loading: false }));
      return;
    }

    try {
      const { data: manutencao } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/manutencao/${equipamento.id}`,
        {
          headers: HEADERS,
        }
      );
      setSessionStorage(cacheKey, manutencao);
      setModalInfo((m) => ({ ...m, manutencao, loading: false }));
    } catch {
      toast.error("Erro ao carregar manutenção.");
      setModalInfo((m) => ({ ...m, loading: false }));
    }
  };

  const paginatedEquipamentos = () => {
    const start = (data.current - 1) * data.pageSize;
    return data.equipamentos.slice(start, start + data.pageSize);
  };

  return (
    <div>
      <h1>Lista de Equipamentos</h1>

      <Pagination
        current={data.current}
        pageSize={data.pageSize}
        total={data.equipamentos.length}
        onChange={(page, size) =>
          setData((d) => ({ ...d, current: page, pageSize: size }))
        }
        showSizeChanger
        pageSizeOptions={["5", "10", "100"]}
      />

      {data.loading ? (
        <Image
          src="/images/loading.gif"
          width={300}
          height={200}
          alt="Loading"
        />
      ) : (
        <div className={styles.cardsContainer}>
          {paginatedEquipamentos().map((equipamento) => (
            <Card
              key={equipamento.id}
              className={styles.card}
              hoverable
              onClick={() => openModal(equipamento)}
              cover={
                <Image
                  alt={equipamento.nome}
                  src={equipamento.photo ? equipamento.photo : "/images/220.svg"}
                  width={220}
                  height={220}
                />
              }
            >
              <Card.Meta
                title={equipamento.nome}
              />
            </Card>
          ))}
        </div>
      )}

      <Modal
        title={`Manutenção de ${modalInfo.equipamento?.nome}`}
        open={modalInfo.visible}
        onCancel={() =>
          setModalInfo({
            visible: false,
            equipamento: null,
            manutencao: null,
            loading: false,
          })
        }
        onOk={() =>
          setModalInfo({
            visible: false,
            equipamento: null,
            manutencao: null,
            loading: false,
          })
        }
        width={600}
      >
        {modalInfo.loading ? (
          <Skeleton active />
        ) : modalInfo.manutencao ? (
          <div>
            <p>
              <span style={{ fontWeight: "bold" }}>Nome da manutenção:</span>{" "}
              {modalInfo.manutencao.nome}
            </p>
            <p>
              <span style={{ fontWeight: "bold" }}>ID do equipamento:</span>{" "}
              {modalInfo.manutencao.equipamento_id}
            </p>
          </div>
        ) : (
          <p style={{ textAlign: "center" }}>Manutenção não encontrada.</p>
        )}
      </Modal>

      <ToastContainer position="top-right" autoClose={4500} />
    </div>
  );
}