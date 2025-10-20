import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()//A inversão de controle faz o Nest instanciar o objeto de destino por mim.
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy{
    constructor(){
        super()
    }
    onModuleInit() {
        return this.$connect(); //quando o prisma client for instanciado, cria conexão
    }
    onModuleDestroy() {
        return this.$disconnect(); //quando for destruido. Se o servidor crashar, eu quero que o banco feche a conexão
    }

}