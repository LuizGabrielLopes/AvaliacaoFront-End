"use client";

import styles from "./Profile.module.css";
import { Button, Card, Flex, Typography, Skeleton } from "antd";
import Image from "next/image";
import Link from "next/link";

export default function Profile() {
    return (
        <Card hoverable className={styles.card}>
            <Flex justify="space-between">
                <div className={styles.imageContainer}>
                    <Image src="/images/luiz.jpg" alt="Luiz" fill className={styles.image} />
                </div>

                <Flex vertical align="flex-end" justify="space-around">
                    <div>
                        <Typography.Title level={3}>Luiz Gabriel</Typography.Title>
                        <Typography.Title level={5} type="success"> Mockup Front1 Exam</Typography.Title>
                        <Typography.Paragraph>Projeto desenvolvido usando</Typography.Paragraph>
                        <ul className={styles.list}>
                            <li>NextJS</li>
                            <li>Axios</li>
                            <li>AntD</li>
                            <li>SessionStorage</li>
                            <li>Toastify</li>
                            <li>CSS Modules</li>
                            <li>Hook</li>
                            <li>PreLoad</li>
                            <li>PreFetch</li>
                            <li>Link / Next</li>
                            <li>Image / Next</li>
                            <li>NodeJS</li>
                            <li>E muito amor 💖</li>
                        </ul>
                    </div>
                    <Link href="/ferramentas" prefetch>
                    <Button type="primary">Acessar minha API via NET</Button>
                    </Link>
                </Flex>
            </Flex>
        </Card>
    );
};