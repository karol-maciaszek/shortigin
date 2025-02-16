module.exports = {
    overwrite: true,
    watch: true,

    generates: {
        "../backend/src/generated/sdk.admin.ts": {
            schema: {
                [process.env.HASURA_GRAPHQL_URL]: {
                    headers: {
                        'x-hasura-admin-secret': process.env.HASURA_GRAPHQL_ADMIN_SECRET,
                    },
                },
            },
            documents: ["../backend/src/**/*.admin.graphql"],
            plugins: [
                "typescript",
                "typescript-operations",
                "typescript-graphql-request",
            ],
        },

        "../frontend/src/generated/urql.user.ts": {
            schema: {
                [process.env.HASURA_GRAPHQL_URL]: {
                    headers: {
                        'x-hasura-admin-secret': process.env.HASURA_GRAPHQL_ADMIN_SECRET,
                        'x-hasura-role': 'user',
                    },
                },
            },
            documents: ["../frontend/src/**/*.user.graphql"],
            config: {
                withHooks: true,
                withComponent: false,
            },
            plugins: ['typescript', 'typescript-operations', 'typescript-urql'],
        },

        "../redirector/src/generated/sdk.admin.ts": {
            schema: {
                [process.env.HASURA_GRAPHQL_URL]: {
                    headers: {
                        'x-hasura-admin-secret': process.env.HASURA_GRAPHQL_ADMIN_SECRET,
                    },
                },
            },
            documents: ["../redirector/src/**/*.admin.graphql"],
            plugins: [
                "typescript",
                "typescript-operations",
                "typescript-graphql-request",
            ],
        },
    },
};
