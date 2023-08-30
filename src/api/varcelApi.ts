export async function triggerVarcelDeploy(): Promise<void> {
  const apiToken = process.env.VARCEL_API_TOKEN;
  const projectId = process.env.VARCEL_PROJECT_ID;

  const deploymentId = await getVarcelLastSuccessfulDeploymentUuid({ apiToken, projectId });
  await redeployVarcelDeploymentProcess({ apiToken, projectId, deploymentId });
}

export async function getVarcelLastSuccessfulDeploymentUuid({ apiToken, projectId }: { apiToken: string | undefined; projectId: string | undefined }) {
  const result = await fetch(`https://vercel.com/api/v6/deployments?projectId=${projectId}&limit=3&target=production&state=READY`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${apiToken}`,
    },
  });
  const data: { deployments: { uid: string }[] } = await result.json();
  return data.deployments[0].uid;
}

export async function redeployVarcelDeploymentProcess(payload: RedeployVarcelDeploymentProcessPayload) {
  const { apiToken, projectId, deploymentId, projectName = 'seven-arch', target = 'production' } = payload;
  await fetch(`https://api.vercel.com/v13/deployments?projectId=${projectId}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiToken}`,
    },
    body: JSON.stringify({
      deploymentId,
      meta: {
        action: 'redeploy',
      },
      name: projectName,
      target,
    }),
  });
}

interface RedeployVarcelDeploymentProcessPayload {
  apiToken?: string;
  projectId?: string;
  deploymentId?: string;
  projectName?: string;
  target?: string;
}
