import { ContentIds, Graph, Id, Ipfs, type Op } from "@graphprotocol/grc-20";

async function mainFunction() {
  const ops: Array<Op> = [];

  const chemistrySpace = "TjWkXLFwhXTqLVMhGAcjki";

  const paperTypeId = "MHRJ4V8Vy4ka9GfX915owL";
  const personTypeId = "GfN9BK2oicLiBHrUavteS8";
  const publisherTypeId = "BGCj2JLjDjqUmGW6iZaANK";

  const authorProp = "JzFpgguvcCaKhbQYPHsrNT";
  const webUrlProp = "93stf6cgYvBsdPruRzq1KK";
  const abstractProp = "92PL1JTfCkuKDT4BLXsFX3";
  const publishedInProp = "61dgWvCDk8QRW2yrfkHuia";
  const publishDateProp = "KPNjGaLx5dKofVhT6Dfw22";
  const relatedSpaceProp = "CHwmK8bk4KMCqBNiV2waL9";

  // ACS Publications
  const { id: publisherCoverId, ops: createPublisherCoverOps } =
    await Graph.createImage({
      url: "https://pubs.acs.org/pb-assets/ux3/pubs-logo-481x82-1523435513963.png",
    });
  ops.push(...createPublisherCoverOps);

  const { id: publisherEntityId, ops: createPublisherOps } = Graph.createEntity(
    {
      name: "ACS Publications",
      types: [publisherTypeId],
      cover: publisherCoverId,
      properties: {
        // Web URL
        [webUrlProp]: {
          type: "URL",
          value: "https://pubs.acs.org/",
        },
      },
    }
  );
  ops.push(...createPublisherOps);
  // Science Publications
  const { id: publisher2CoverId, ops: createPublisher2CoverOps } =
    await Graph.createImage({
      url: "https://www.science.org/pb-assets/images/logos/science-logo-1620488349680.svg",
    });
  ops.push(...createPublisher2CoverOps);

  const { id: publisher2EntityId, ops: createPublisher2Ops } =
    Graph.createEntity({
      name: "Science",
      types: [publisherTypeId],
      cover: publisher2CoverId,
      properties: {
        // Web URL
        [webUrlProp]: {
          type: "URL",
          value: "https://www.science.org/",
        },
      },
    });
  ops.push(...createPublisher2Ops);

  // Nature Chemical Biology Publications
  const { id: publisher3CoverId, ops: createPublisher3CoverOps } =
    await Graph.createImage({
      url: "https://media.springernature.com/full/nature-cms/uploads/product/nchembio/header-50d06869ed25c6bb21c2452f4894342f.svg",
    });
  ops.push(...createPublisher3CoverOps);

  const { id: publisher3EntityId, ops: createPublisher3Ops } =
    Graph.createEntity({
      name: "Nature Chemical Biology",
      types: [publisherTypeId],
      cover: publisher3CoverId,
      properties: {
        // Web URL
        [webUrlProp]: {
          type: "URL",
          value: "https://www.nature.com/",
        },
      },
    });
  ops.push(...createPublisher3Ops);

  // BMC- Journal of Cheminformatics Publications
  const { id: publisher4CoverId, ops: createPublisher4CoverOps } =
    await Graph.createImage({
      url: "https://jcheminf.biomedcentral.com/static/images/bmc/logos/logo-bmc-white-aj-be532aa3f0.svg",
    });
  ops.push(...createPublisher4CoverOps);

  const { id: publisher4EntityId, ops: createPublisher4Ops } =
    Graph.createEntity({
      name: "BMC- Journal of Cheminformatics",
      types: [publisherTypeId],
      cover: publisher4CoverId,
      properties: {
        // Web URL
        [webUrlProp]: {
          type: "URL",
          value: "https://jcheminf.biomedcentral.com/",
        },
      },
    });
  ops.push(...createPublisher4Ops);

  // APS Publications
  const { id: publisher5CoverId, ops: createPublisher5CoverOps } =
    await Graph.createImage({
      url: "https://journals.aps.org/images/aps-logo-text.svg?1741359853",
    });
  ops.push(...createPublisher5CoverOps);

  const { id: publisher5EntityId, ops: createPublisher5Ops } =
    Graph.createEntity({
      name: "APS",
      types: [publisherTypeId],
      cover: publisher5CoverId,
      properties: {
        // Web URL
        [webUrlProp]: {
          type: "URL",
          value: "https://journals.aps.org/",
        },
      },
    });
  ops.push(...createPublisher5Ops);

  // Taylor & Francis Publications
  const { id: publisher6CoverId, ops: createPublisher6CoverOps } =
    await Graph.createImage({
      url: "https://www.tandfonline.com/pb-assets/Global/TFO-logo-new-1716484961953.svg",
    });
  ops.push(...createPublisher6CoverOps);

  const { id: publisher6EntityId, ops: createPublisher6Ops } =
    Graph.createEntity({
      name: "APS",
      types: [publisherTypeId],
      cover: publisher6CoverId,
      properties: {
        // Web URL
        [webUrlProp]: {
          type: "URL",
          value: "https://www.tandfonline.com/",
        },
      },
    });
  ops.push(...createPublisher6Ops);

  // First Paper
  // Paper Cover Image
  const { id: paper1CoverId, ops: createPaper1CoverOps } =
    await Graph.createImage({
      url: "https://hms.harvard.edu/sites/default/files/media/Human%20genome%20large.jpg",
    });
  ops.push(...createPaper1CoverOps);

  const { id: paperEntityId1, ops: createPaperOps1 } = Graph.createEntity({
    name: "Chemistry of Gene Silencing: The Mechanism of NAD+-Dependent Deacetylation Reactions",
    types: [paperTypeId],
    cover: paper1CoverId,
    properties: {
      // Abstract
      [abstractProp]: {
        type: "TEXT",
        value:
          "The Sir2 enzyme family is responsible for a newly classified chemical reaction, NAD+-dependent protein deacetylation. New peptide substrates, the reaction mechanism, and the products of the acetyl transfer to NAD+ are described for SIR2. The final products of SIR2 reactions are the deacetylated peptide and the 2‘ and 3‘ regioisomers of O-acetyl ADP ribose (AADPR), formed through an α-1‘-acetyl ADP ribose intermediate and intramolecular transesterification reactions (2‘ → 3‘). The regioisomers, their anomeric forms, the interconversion rates, and the reaction equilibria were characterized by NMR, HPLC, 18O exchange, and MS methods. The mechanism of acetyl transfer to NAD+ includes (1) ADP ribosylation of the peptide acyl oxygen to form a high-energy O-alkyl amidate intermediate, (2) attack of the 2‘-OH group on the amidate to form a 1‘,2‘-acyloxonium species, (3) hydrolysis to 2‘-AADPR by the attack of water on the carbonyl carbon, and (4) an SIR2-independent transesterification equilibrating the 2‘- and 3‘-AADPRs. This mechanism is unprecedented in ADP-ribosyl transferase enzymology. The 2‘- and 3‘-AADPR products are candidate molecules for SIR2-initiated signaling pathways. ",
      },
      // Web URL
      [webUrlProp]: {
        type: "URL",
        value: "https://doi.org/10.1021/BI011858J",
      },
      [publishedInProp]: {
        to: publisherEntityId,
      },
      [publishDateProp]: {
        type: "TIME",
        value: "December 1st, 2001",
      },
    },
  });
  ops.push(...createPaperOps1);

  // Second Paper
  // Paper Cover Image
  const { id: paper2CoverId, ops: createPaper2CoverOps } =
    await Graph.createImage({
      url: "https://images.my.labster.com/88bbaa8b-de28-460a-9d1a-10561e677b45/ROH_Stereochemistry.en.x512.png",
    });
  ops.push(...createPaper2CoverOps);

  const { id: paperEntityId2, ops: createPaperOps2 } = Graph.createEntity({
    name: "Stereoselective Organic Reactions: Catalysts for Carbonyl Addition Processes",
    types: [paperTypeId],
    cover: paper2CoverId,
    properties: {
      // Abstract
      [abstractProp]: {
        type: "TEXT",
        value:
          "Important advances are being made in the development of stereoselective organic reactions. Some of the emerging research directions that hold forth great promise in this area deal with the development of chiral catalysts for these processes. This review attempts to unify one aspect of this field, the development of catalysts and catalyst models for the enantioselective addition of hydride and carbon nucleophiles to carbonyl substrates. Mechanistic constructs for the stereodifferentiating transition states are provided.",
      },
      // Web URL
      [webUrlProp]: {
        type: "URL",
        value: "https://doi.org/10.1126/SCIENCE.3358127",
      },
      [publishedInProp]: {
        to: publisher2EntityId,
      },
      [publishDateProp]: {
        type: "TIME",
        value: "April 22nd, 1988",
      },
    },
  });
  ops.push(...createPaperOps2);

  // Third Paper
  // Paper Cover Image
  const { id: paper3CoverId, ops: createPaper3CoverOps } =
    await Graph.createImage({
      url: "https://media.istockphoto.com/id/1203733319/photo/natural-drug-research-natural-organic-and-scientific-extraction-in-glassware-alternative.jpg?s=612x612&w=0&k=20&c=dh62LrUUgXJmeuu6I5KQZhbETmxjW0E1bvAoqktB08U=",
    });
  ops.push(...createPaper3CoverOps);

  const { id: paperEntityId3, ops: createPaperOps3 } = Graph.createEntity({
    name: "Chemistry in living systems",
    types: [paperTypeId],
    cover: paper3CoverId,
    properties: {
      // Abstract
      [abstractProp]: {
        type: "TEXT",
        value:
          "Dissecting complex cellular processes requires the ability to track biomolecules as they function within their native habitat. Although genetically encoded tags such as GFP are widely used to monitor discrete proteins, they can cause significant perturbations to a protein's structure and have no direct extension to other classes of biomolecules such as glycans, lipids, nucleic acids and secondary metabolites. In recent years, an alternative tool for tagging biomolecules has emerged from the chemical biology community—the bioorthogonal chemical reporter. In a prototypical experiment, a unique chemical motif, often as small as a single functional group, is incorporated into the target biomolecule using the cell's own biosynthetic machinery. The chemical reporter is then covalently modified in a highly selective fashion with an exogenously delivered probe. This review highlights the development of bioorthogonal chemical reporters and reactions and their application in living systems.",
      },
      // Web URL
      [webUrlProp]: {
        type: "URL",
        value: "https://doi.org/10.1038/NCHEMBIO0605-13",
      },
      [publishedInProp]: {
        to: publisher3EntityId,
      },
      [publishDateProp]: {
        type: "TIME",
        value: "July 1st, 2005",
      },
    },
  });
  ops.push(...createPaperOps3);

  // Fourth Paper
  // Paper Cover Image
  const { id: paper4CoverId, ops: createPaper4CoverOps } =
    await Graph.createImage({
      url: "https://www.mayo.edu/-/media/kcms/gbs/research/images/2019/02/06/15/18/genetics-bioinformatics-shu-571040611-8col.jpg",
    });
  ops.push(...createPaper4CoverOps);

  const { id: paperEntityId4, ops: createPaperOps4 } = Graph.createEntity({
    name: "The Chemistry Development Kit (CDK): an open-source Java library for Chemo- and Bioinformatics",
    types: [paperTypeId],
    cover: paper4CoverId,
    properties: {
      // Abstract
      [abstractProp]: {
        type: "TEXT",
        value:
          "The Chemistry Development Kit (CDK) is a freely available open-source Java library for Structural Chemo- and Bioinformatics. Its architecture and capabilities as well as the development as an open-source project by a team of international collaborators from academic and industrial institutions is described. The CDK provides methods for many common tasks in molecular informatics, including 2D and 3D rendering of chemical structures, I/O routines, SMILES parsing and generation, ring searches, isomorphism checking, structure diagram generation, etc. Application scenarios as well as access information for interested users and potential contributors are given.",
      },
      // Web URL
      [webUrlProp]: {
        type: "URL",
        value: "https://doi.org/10.1021/CI025584Y",
      },
      [publishedInProp]: {
        to: publisherEntityId,
      },
      [publishDateProp]: {
        type: "TIME",
        value: "February 11th, 2003",
      },
    },
  });
  ops.push(...createPaperOps4);

  // Fifth Paper
  // Paper Cover Image
  const { id: paper5CoverId, ops: createPaper5CoverOps } =
    await Graph.createImage({
      url: "https://www.chemicals.co.uk/wp-content/uploads/2021/09/atoms-and-molecules-scaled.jpg.webp",
    });
  ops.push(...createPaper5CoverOps);

  const { id: paperEntityId5, ops: createPaperOps5 } = Graph.createEntity({
    name: "Chemical named entities recognition: a review on approaches and applications",
    types: [paperTypeId],
    cover: paper5CoverId,
    properties: {
      // Abstract
      [abstractProp]: {
        type: "TEXT",
        value:
          "The rapid increase in the flow rate of published digital information in all disciplines has resulted in a pressing need for techniques that can simplify the use of this information. The chemistry literature is very rich with information about chemical entities. Extracting molecules and their related properties and activities from the scientific literature to “text mine” these extracted data and determine contextual relationships helps research scientists, particularly those in drug development. One of the most important challenges in chemical text mining is the recognition of chemical entities mentioned in the texts. In this review, the authors briefly introduce the fundamental concepts of chemical literature mining, the textual contents of chemical documents, and the methods of naming chemicals in documents. We sketch out dictionary-based, rule-based and machine learning, as well as hybrid chemical named entity recognition approaches with their applied solutions. We end with an outlook on the pros and cons of these approaches and the types of chemical entities extracted.",
      },
      // Web URL
      [webUrlProp]: {
        type: "URL",
        value: "https://doi.org/10.1186/1758-2946-6-17",
      },
      [publishedInProp]: {
        to: publisher4EntityId,
      },
      [publishDateProp]: {
        type: "TIME",
        value: "January 1st, 2015",
      },
    },
  });
  ops.push(...createPaperOps5);

  // Sixth Paper
  // Paper Cover Image
  const { id: paper6CoverId, ops: createPaper6CoverOps } =
    await Graph.createImage({
      url: "https://www.science.org/do/10.1126/science.zlxq0ls/abs/_20240529_fea_quantum_computing_chemistry_lede_1216.jpg",
    });
  ops.push(...createPaper6CoverOps);

  const { id: paperEntityId6, ops: createPaperOps6 } = Graph.createEntity({
    name: "Coupled-cluster theory in quantum chemistry",
    types: [paperTypeId],
    cover: paper6CoverId,
    properties: {
      // Abstract
      [abstractProp]: {
        type: "TEXT",
        value:
          "Today, coupled-cluster theory offers the most accurate results among the practical ab initio electronic-structure theories applicable to moderate-sized molecules. Though it was originally proposed for problems in physics, it has seen its greatest development in chemistry, enabling an extensive range of applications to molecular structure, excited states, properties, and all kinds of spectroscopy. In this review, the essential aspects of the theory are explained and illustrated with informative numerical results.",
      },
      // Web URL
      [webUrlProp]: {
        type: "URL",
        value: "https://doi.org/10.1103/REVMODPHYS.79.291",
      },
      [publishedInProp]: {
        to: publisher5EntityId,
      },
      [publishDateProp]: {
        type: "TIME",
        value: "February 22nd, 2007",
      },
    },
  });
  ops.push(...createPaperOps6);

  // Seventh Paper
  // Paper Cover Image
  const { id: paper7CoverId, ops: createPaper7CoverOps } =
    await Graph.createImage({
      url: "https://cdn-images-1.medium.com/max/1079/1*BPYzJLZs66C9VxhuzSfb-A.png",
    });
  ops.push(...createPaper7CoverOps);

  const { id: paperEntityId7, ops: createPaperOps7 } = Graph.createEntity({
    name: "Structure-based classification and ontology in chemistry",
    types: [paperTypeId],
    cover: paper7CoverId,
    properties: {
      // Abstract
      [abstractProp]: {
        type: "TEXT",
        value:
          "Recent years have seen an explosion in the availability of data in the chemistry domain. With this information explosion, however, retrieving relevant results from the available information, and organising those results, become even harder problems. Computational processing is essential to filter and organise the available resources so as to better facilitate the work of scientists. Ontologies encode expert domain knowledge in a hierarchically organised machine-processable format. One such ontology for the chemical domain is ChEBI. ChEBI provides a classification of chemicals based on their structural features and a role or activity-based classification. An example of a structure-based class is 'pentacyclic compound' (compounds containing five-ring structures), while an example of a role-based class is 'analgesic', since many different chemicals can act as analgesics without sharing structural features. Structure-based classification in chemistry exploits elegant regularities and symmetries in the underlying chemical domain. As yet, there has been neither a systematic analysis of the types of structural classification in use in chemistry nor a comparison to the capabilities of available technologies.",
      },
      // Web URL
      [webUrlProp]: {
        type: "URL",
        value: "https://doi.org/10.1186/1758-2946-4-8",
      },
      [publishedInProp]: {
        to: publisher4EntityId,
      },
      [publishDateProp]: {
        type: "TIME",
        value: "April 5th, 2012",
      },
    },
  });
  ops.push(...createPaperOps7);

  // Eight Paper
  // Paper Cover Image
  const { id: paper8CoverId, ops: createPaper8CoverOps } =
    await Graph.createImage({
      url: "https://www.genome.gov/sites/default/files/inline-images/1_DNA_vs_RNA.jpg",
    });
  ops.push(...createPaper8CoverOps);

  const { id: paperEntityId8, ops: createPaperOps8 } = Graph.createEntity({
    name: "Prebiotic Chemistry and the Origin of the RNA World",
    types: [paperTypeId],
    cover: paper8CoverId,
    properties: {
      // Abstract
      [abstractProp]: {
        type: "TEXT",
        value:
          "The demonstration that ribosomal peptide synthesis is a ribozyme-catalyzed reaction makes it almost certain that there was once an RNA World. The central problem for origin-of-life studies, therefore, is to understand how a protein-free RNA World became established on the primitive Earth. We first review the literature on the prebiotic synthesis of the nucleotides, the nonenzymatic synthesis and copying of polynucleotides, and the selection of ribozyme catalysts of a kind that might have facilitated polynucleotide replication. This leads to a brief outline of the Molecular Biologists' Dream, an optimistic scenario for the origin of the RNA World. In the second part of the review we point out the many unresolved problems presented by the Molecular Biologists' Dream. This in turn leads to a discussion of genetic systems simpler than RNA that might have “invented” RNA. Finally, we review studies of prebiotic membrane formation.",
      },
      // Web URL
      [webUrlProp]: {
        type: "URL",
        value: "https://doi.org/10.1080/10409230490460765",
      },
      [publishedInProp]: {
        to: publisher6EntityId,
      },
      [publishDateProp]: {
        type: "TIME",
        value: "March 10th, 2010",
      },
    },
  });
  ops.push(...createPaperOps8);

  // Nineth Paper
  // Paper Cover Image
  const { id: paper9CoverId, ops: createPaper9CoverOps } =
    await Graph.createImage({
      url: "https://i.ytimg.com/vi/X10VZeQmFDo/maxresdefault.jpg",
    });
  ops.push(...createPaper9CoverOps);

  const { id: paperEntityId9, ops: createPaperOps9 } = Graph.createEntity({
    name: "Cation-pi interactions in chemistry and biology: a new view of benzene, Phe, Tyr, and Trp",
    types: [paperTypeId],
    cover: paper9CoverId,
    properties: {
      // Abstract
      [abstractProp]: {
        type: "TEXT",
        value:
          "Cations bind to the π face of an aromatic structure through a surprisingly strong, noncovalent force termed the cation-π interaction. The magnitude and generality of the effect have been established by gas-phase measurements and by studies of model receptors in aqueous media. To first order, the interaction can be considered an electrostatic attraction between a positive charge and the quadrupole moment of the aromatic. A great deal of direct and circumstantial evidence indicates that cation-π interactions are important in a variety of proteins that bind cationic ligands or substrates. In this context, the amino acids phenylalanine (Phe), tyrosine (Tyr), and tryptophan (Trp) can be viewed as polar, yet hydrophobic, residues.",
      },
      // Web URL
      [webUrlProp]: {
        type: "URL",
        value: "https://doi.org/10.1126/SCIENCE.271.5246.163",
      },
      [publishedInProp]: {
        to: publisher2EntityId,
      },
      [publishDateProp]: {
        type: "TIME",
        value: "January 12th, 1996",
      },
    },
  });
  ops.push(...createPaperOps9);

  const cid = await Ipfs.publishEdit({
    name: "New Entities",
    ops: ops,
    author: "0x3b7954B3746618dBE3D5c929Cd8D3fF5AA567BA0",
  });

  console.log("hash", cid);
}

mainFunction();
